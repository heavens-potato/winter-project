import React, { useState, useEffect, useMemo } from 'react';
import { Card, Tab, Tabs, Box, TextField, IconButton, Button, Paper, Divider, Select, MenuItem, Typography, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';
import { doc, setDoc, getDoc, onSnapshot, collection, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from './firebase'; // Import auth from firebase.js
import Navbar from './Navbar';
import ApplicationPopup from './ApplicationPopup';
import { ThemeProvider, useMediaQuery } from '@mui/system';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';

// Accordion imports for responsive filter panel
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FilterListIcon from '@mui/icons-material/FilterList';
import { onAuthStateChanged } from 'firebase/auth';

import { motion } from 'framer-motion';

function Dashboard() {
    // Responsive breakpoint
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Get current user to display their name and application CRUD operations
    let user = auth.currentUser;

    React.useEffect(() => {
        document.title = 'hydroHire - Dashboard';
    }, []);

    const columns = [
        { field: 'positionTitle', headerName: 'Position', width: isMobile ? 130 : 175, flex: 1, minWidth: 130 },
        { field: 'companyName', headerName: 'Company', width: isMobile ? 150 : 175, flex: 1, minWidth: 150 },
        { field: 'location', headerName: 'Location', width: isMobile ? 140 : 150, flex: 1, minWidth: 140 },
        { field: 'appDate', headerName: 'App Date', width: isMobile ? 140 : 150, minWidth: 140 },
        { field: 'salary', headerName: 'Salary', width: isMobile ? 120 : 150, filterable: false, minWidth: 120 },
        { field: 'description', headerName: 'Description', width: isMobile ? 120 : 160, minWidth: 160, flex: 1, filterable: false },
        { field: 'status', headerName: 'Status', width: isMobile ? 120 : 150, minWidth: 120, editable: true, filterable: false },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: isMobile ? 130 : 150,
            filterable: false,
            minWidth: 30,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    {/* Edit Icon */}
                    <IconButton onClick={() => handleEditClick(params.row)}>
                        <EditIcon />
                    </IconButton>
                    {/* Delete Icon */}
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        },
    ];

    const [pageSize, setPageSize] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [status, setStatus] = React.useState('');

    const [selectedColumns, setSelectedColumns] = React.useState(columns.map(col => col.field));
    const [selectedApp, setSelectedApp] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [rows, setRows] = useState([]);
    const [allRows, setAllRows] = useState([]);

    const [selectedTab, setSelectedTab] = useState(0);
    const [counts, setCounts] = useState({
        total: 0,
        applied: 0,
        screening: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
    });

    useEffect(() => {
        const updatedCounts = rows.reduce((acc, row) => {
            acc.total++;
            acc[row.status] = (acc[row.status] || 0) + 1;
            return acc;
        }, { total: 0, applied: 0, screening: 0, interview: 0, offer: 0, rejected: 0 });
        setCounts(updatedCounts);
    }, [rows]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const chartData = useMemo(() => [
        { name: 'Applied', value: counts.applied },
        { name: 'Screening', value: counts.screening },
        { name: 'Interview', value: counts.interview },
        { name: 'Offer', value: counts.offer },
        { name: 'Rejected', value: counts.rejected },
    ], [counts]);

    const handleDialogOpen = () => setOpenDialog(true);

    const handleEditClick = (appData) => {
        setSelectedApp(appData);
        setOpenDialog(true);
    }

    const handleDialogClose = () => {
        setSelectedApp(null);
        setOpenDialog(false);
    }

    const handleSubmit = (event, updatedAppData) => {
        // if (selectedApp) {
        //   setRows(rows.map(row => row.id === selectedApp.id ? { ...row, ...updatedAppData } : row));
        // } else {
        //   setRows(prevRows => [...prevRows, { id: Date.now().toString(), ...updatedAppData }]);
        // }
        const addData = async () => {
            try {
                const uid = user.uid;
                let parentDocRef = doc(db, 'applications', uid);
                let docSnap = await getDoc(parentDocRef);
                if (!docSnap.exists()) {
                    await setDoc(doc(db, "applications", uid), {});
                    parentDocRef = doc(db, 'applications', uid);
                    docSnap = await getDoc(parentDocRef);
                }
                if (selectedApp) {
                    console.log(selectedApp.id);
                    const docRef = doc(docSnap.ref, 'apps', selectedApp.id);
                    console.log("doc god");
                    await updateDoc(docRef, {
                        appDate: updatedAppData.appDate,
                        companyName: updatedAppData.companyName,
                        positionTitle: updatedAppData.positionTitle,
                        location: updatedAppData.location,
                        description: updatedAppData.description,
                        salary: updatedAppData.salary,
                        status: updatedAppData.status,
                    });
                } else {
                    const subCollectionRef = collection(docSnap.ref, 'apps');
                    await addDoc(subCollectionRef, {
                        appDate: updatedAppData.appDate,
                        companyName: updatedAppData.companyName,
                        positionTitle: updatedAppData.positionTitle,
                        location: updatedAppData.location,
                        description: updatedAppData.description,
                        salary: updatedAppData.salary,
                        status: updatedAppData.status,
                    });
                }
            } catch (error) {
                console.error("Error Adding/Editing Doc from Popup:");
            }
        };
        addData();
        console.log("Add works!");
        setOpenDialog(false);
    }

    const handleDelete = async (id) => {
        try {
            const uid = user.uid;
            const parentDocRef = doc(db, 'applications', uid);
            const docSnap = await getDoc(parentDocRef);

            if (!docSnap.exists()) {
                console.log("Parent document doesn't exist");
                return;
            }

            const subCollectionRef = collection(docSnap.ref, 'apps');
            const docRef = doc(subCollectionRef, id);
            await deleteDoc(docRef);

            setRows((prevRows) => prevRows.filter((row) => row.id !== id));

            console.log(`Deleted application with ID: ${id}`);
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    const handleColumnsChange = (event) => {
        setSelectedColumns(event.target.value);
    };

    // Status onchange function and status filtering logic
    const handleStatusChange = (event) => {
        const selectedStatus = event.target.value; // Get user selected status
        setStatus(selectedStatus); // Update state to reflect selected status

        // Check if default status filter (none is selected)
        if (selectedStatus === "") {
            setRows(allRows); // If no status filter, show all rows
        } else {
            setRows(allRows.filter((row) => row.status === selectedStatus)); // Filter based on selected status
        }
    };

    // Date onchange function and date filtering logic
    const handleDateChange = (event) => {
        const selectedDate = event.target.value; // Get user selected date
        setDate(selectedDate); // Update state to reflected selected date

        if (selectedDate === "") {
            setRows(allRows);
        } else {
            setRows(allRows.filter((row) => row.appDate === selectedDate)); // Filter based on selected date
        }
    }

    // Search onChange function and search bar filtering logic
    const handleSearchChange = (event) => {
        const search = event.target.value;
        setSearch(search);

        if (search === "") {
            setRows(allRows);
        } else {
            setRows(allRows.filter((row) => row.positionTitle.toLowerCase().includes(search.toLowerCase()) ||
                row.companyName.toLowerCase().includes(search.toLowerCase()) ||
                row.location.toLowerCase().includes(search.toLowerCase())));
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const uid = user.uid;
                const parentDocRef = doc(db, 'applications', uid);
                const docSnap = await getDoc(parentDocRef);
                if (docSnap.exists()) {
                    const subCollectionRef = collection(docSnap.ref, 'apps');
                    const unsubscribe = onSnapshot(subCollectionRef, (querySnapshot) => {
                        const dataArray = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setAllRows(dataArray); // Store all rows future filtering
                        setRows(dataArray); // Display all rows initially
                    });
                    return unsubscribe;
                } else {
                    console.log("No such document!");
                    return () => { }; // No-op unsubscribe
                }
            } catch (error) {
                console.error("Error fetching data:");
                return () => { }; // No-op unsubscribe
            }
        };
        onAuthStateChanged(auth, (us) => {
            user = us;
            getData();
        });
    }, []);

    const displayedColumns = columns.filter(column => selectedColumns.includes(column.field));

    const [date, setDate] = React.useState('');

    // Define initial filter model as a state variable
    const [filterModel, setFilterModel] = useState({
        items: [

        ],
    });

    // Call setFilterModel every time any search input is changed - state changes are asynchronous 
    // and a useEffect() is necessary to force the filter model to update with each input change
    useEffect(() => {
        setFilterModel({
            items: [

            ],
        });
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const uid = user.uid;
                const parentDocRef = doc(db, 'applications', uid);
                const docSnap = await getDoc(parentDocRef);
                if (docSnap.exists()) {
                    const subCollectionRef = collection(docSnap.ref, 'apps');
                    const unsubscribe = onSnapshot(subCollectionRef, (querySnapshot) => {
                        const dataArray = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                            handleEditClick: handleEditClick,
                        }));
                        setRows(dataArray);
                    });
                    return unsubscribe;
                } else {
                    console.log("No such document!");
                    return () => { }; // No-op unsubscribe
                }
            } catch (error) {
                console.error("Error fetching data:");
                return () => { }; // No-op unsubscribe
            }
        };
        onAuthStateChanged(auth, (us) => {
            user = us;
            getData();
        })
    }, []);



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Paper sx={{ width: 'calc(100% - 40px)', margin: '20px auto', padding: '10px', borderRadius: '8px' }}>
                {/* Greeting based on user display name */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Typography variant="h4" sx={{ fontSize: 28, fontWeight: 'bold', marginBottom: '30px' }}>
                        Hi, <span style={{ color: theme.palette.primary.light }}>{user?.displayName || "there"}</span>
                    </Typography>
                </motion.div>

                {/* Application Overview */}
                <Box sx={{ marginBottom: '35px' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <Typography variant="h4" sx={{ fontSize: 28, fontWeight: 'bold', marginBottom: '30px' }}>
                            Application Overview
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <Typography variant="body1" sx={{ fontSize: 16, color: 'text.secondary', marginBottom: '30px' }}>
                            Start adding applications to receive insightful visualizations about your job application process.
                        </Typography>
                    </motion.div>

                    <Divider sx={{ width: '100%', margin: '0 auto' }} />
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                        <Box flex={1} display="flex" flexDirection="column">
                            {/* Charts */}
                            <Box sx={{ width: '100%' }}>
                                <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
                                    <Tab label="Bar Chart" />
                                    <Tab label="Pie Chart" />
                                </Tabs>
                                <Box sx={{ marginTop: '20px' }}>
                                    {selectedTab === 0 ? (
                                        <BarChartComponent data={chartData} />
                                    ) : (
                                        <PieChartComponent data={chartData} />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box flex={1} sx={{ padding: '20px' }}>
                            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
                                Key Metrics
                            </Typography>
                            <Grid container spacing={2}>
                                {/* Total Applications */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card variant="outlined" sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="h6">Total Applications</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                            {chartData.find(item => item.name === 'Total')?.total || 0}
                                        </Typography>
                                    </Card>
                                </Grid>
                                {/* Applied */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card variant="outlined" sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#e3f2fd' }}>
                                        <Typography variant="h6">Applied</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                                            {chartData.find(item => item.name === 'Applied')?.total || 0}
                                        </Typography>
                                    </Card>
                                </Grid>
                                {/* Screening */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card variant="outlined" sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#e8f5e9' }}>
                                        <Typography variant="h6">Screening</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                                            {chartData.find(item => item.name === 'Screening')?.total || 0}
                                        </Typography>
                                    </Card>
                                </Grid>
                                {/* Interview */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card variant="outlined" sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#fff3e0' }}>
                                        <Typography variant="h6">Interview</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                                            {chartData.find(item => item.name === 'Interview')?.total || 0}
                                        </Typography>
                                    </Card>
                                </Grid>
                                {/* Offer */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card variant="outlined" sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#f1f8e9' }}>
                                        <Typography variant="h6">Offer</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                                            {chartData.find(item => item.name === 'Offer')?.total || 0}
                                        </Typography>
                                    </Card>
                                </Grid>
                                {/* Rejected */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card variant="outlined" sx={{ padding: '15px', textAlign: 'center', backgroundColor: '#ffebee' }}>
                                        <Typography variant="h6">Rejected</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                            {chartData.find(item => item.name === 'Rejected')?.total || 0}
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>

                {/* Job Application Tracker */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    <Typography variant="h4" sx={{ marginBottom: '20px', fontSize: 28, fontWeight: 'bold' }}>
                        Job Application Tracker
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'space-between' }, alignItems: 'center', marginBottom: '20px' }}>
                        {/* Search Bar */}
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder={isMobile ? "Search for a job" : "Search by position, company, or location"}
                            value={search}
                            onChange={handleSearchChange}
                            sx={{ flexGrow: 1, borderRadius: '40px', padding: '10px', '& .MuiOutlinedInput-root': { borderRadius: '20px', paddingLeft: '12px' } }}
                            InputProps={{
                                startAdornment: (
                                    <IconButton position="start">
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />

                        <ThemeProvider theme={theme}>
                            {/* Add application button, conditonally render button text content based on screen width */}
                            <Button
                                onClick={handleDialogOpen}
                                variant="contained"
                                sx={{
                                    marginLeft: '20px',
                                    fontSize: 18,
                                    backgroundColor: (theme) => theme.palette.primary.light,
                                    color: (theme) => theme.palette.primary.dark,
                                    '&:hover': {
                                        backgroundColor: (theme) => theme.palette.primary.dark,
                                        color: (theme) => theme.palette.primary.white,
                                    },
                                }}
                            >
                                {isMobile ? '+' : '+ Add New Application'}
                            </Button>
                        </ThemeProvider>

                        {/* Add Application Popup */}
                        <ApplicationPopup
                            open={openDialog}
                            handleClose={handleDialogClose}
                            handleSubmit={handleSubmit}
                            title={selectedApp ? "Edit This Application" : "Add New Job"}
                            actionButton={selectedApp ? "Save" : "Add"}
                            appData={selectedApp}
                        />
                    </Box>
                </motion.div>

                {/* If the screen width is mobile, render the collapsible filter menu */}
                {isMobile ? (
                    <>
                        <Accordion elevation={0}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.7 }}
                            >
                                <AccordionSummary
                                    expandIcon={<FilterListIcon sx={{ color: (theme) => theme.palette.primary.dark }} />}
                                    aria-controls="panel-content"
                                    id="panel-header"
                                    sx={{
                                        color: (theme) => theme.palette.primary.dark,
                                        backgroundColor: 'white',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography>Filter Applications</Typography>
                                </AccordionSummary>
                            </motion.div>

                            <AccordionDetails>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', gap: 2 }}>
                                    <Select
                                        value={status}
                                        onChange={handleStatusChange}
                                        displayEmpty
                                        size="small"
                                        sx={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: '10px',
                                            height: '40px',
                                            '& .MuiSelect-select': { padding: '10px' },
                                        }}
                                    >
                                        <MenuItem value="">Select Status</MenuItem>
                                        <MenuItem value="Applied">Applied</MenuItem>
                                        <MenuItem value="Screening">Screening</MenuItem>
                                        <MenuItem value="Interview">Interview</MenuItem>
                                        <MenuItem value="Offer">Offer</MenuItem>
                                        <MenuItem value="Rejected">Rejected</MenuItem>
                                    </Select>

                                    {/* Date Filter */}
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="date"
                                        value={date}
                                        onChange={handleDateChange}
                                        sx={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: '10px',
                                            height: '40px',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                            },
                                            '& .MuiOutlinedBase-root': {
                                                borderRadius: '10px',
                                            }
                                        }}
                                    />

                                    {/* Columns Displayed */}
                                    <Select
                                        value={selectedColumns.length > 0 ? selectedColumns : 'Columns Displayed'}
                                        onChange={handleColumnsChange}
                                        displayEmpty
                                        multiple
                                        size="small"
                                        sx={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: '10px',
                                            height: '40px',
                                            '& .MuiSelect-select': { padding: '10px' },
                                        }}
                                    >
                                        <MenuItem value="" disabled>Columns Displayed</MenuItem>
                                        {columns
                                            .filter((column) => column.field !== 'actions')
                                            .map((column) => (
                                                <MenuItem key={column.field} value={column.field}>{column.headerName}</MenuItem>
                                            ))}
                                    </Select>

                                    {/* Text to remind the user that they can sort by asc/desc by clicking column headers */}
                                    <div className="flex justify-center items-center pt-5">
                                        <h4>You can also tap on column headers to sort in ascending or descending order!</h4>
                                    </div>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </>
                ) : (

                    // If the screen isn't mobile, render the default filter menu
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginLeft: '10px', gap: 6 }}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                            >
                                <Select
                                    value={status}
                                    onChange={handleStatusChange}
                                    displayEmpty
                                    size="small"
                                    sx={{
                                        minWidth: 180,
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        height: '40px',
                                        '& .MuiSelect-select': { padding: '10px' },
                                    }}
                                >
                                    <MenuItem value="">Select Status</MenuItem>
                                    <MenuItem value="Applied">Applied</MenuItem>
                                    <MenuItem value="Screening">Screening</MenuItem>
                                    <MenuItem value="Interview">Interview</MenuItem>
                                    <MenuItem value="Offer">Offer</MenuItem>
                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                </Select>
                            </motion.div>

                            {/* Date Filter */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            >
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    sx={{
                                        minWidth: 180,
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        height: '40px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                        },
                                        '& .MuiOutlinedBase-root': {
                                            borderRadius: '10px',
                                        }
                                    }}
                                />
                            </motion.div>

                            {/* Columns Displayed */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.7 }}
                            >
                                <Select
                                    value={selectedColumns}
                                    onChange={handleColumnsChange}
                                    displayEmpty
                                    multiple
                                    size="small"
                                    sx={{
                                        minWidth: 180,
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        height: '40px',
                                        '& .MuiSelect-select': { padding: '10px' },
                                    }}
                                >
                                    <MenuItem value="" disabled>Columns Displayed</MenuItem>
                                    {columns
                                        .filter((column) => column.field !== 'actions')
                                        .map((column) => (
                                            <MenuItem key={column.field} value={column.field}>{column.headerName}</MenuItem>
                                        ))}
                                </Select>
                            </motion.div>

                            {/* Text to remind the user that they can sort by asc/desc by clicking column headers */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.8 }}
                            >
                                <div className="flex justify-center items-center text-center w-full">
                                    <h4>You can also click on column headers to sort in ascending or descending order!</h4>
                                </div>
                            </motion.div>

                        </Box>
                    </>
                )}

                {/* DataGrid */}
                <motion.div
                    style={{ height: 400, width: '100%' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                >
                    <DataGrid
                        rows={rows}
                        columns={displayedColumns}
                        pageSize={pageSize}
                        onPageSizeChange={(newSize) => setPageSize(newSize)}
                        disableSelectionOnClick
                        disableColumnSelector
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection={false} w
                        selectionModel={null}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? `bg-${theme.palette.primary.main}` : `bg-[${theme.palette.secondary.light}]`
                        }
                        filterModel={filterModel}
                        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                    />
                </motion.div>
            </Paper >
        </Box >
    );
}

export default Dashboard;