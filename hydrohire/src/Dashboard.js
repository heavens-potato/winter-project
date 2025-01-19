import React, { useState, useEffect, useRef, useContext } from 'react';
import { Tab, Tabs, Box, TextField, IconButton, Button, Paper, Divider, Select, MenuItem, Typography, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { doc, setDoc, getDoc, onSnapshot, collection, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from './firebase'; // Import auth from firebase.js
import Navbar from './Navbar';
import ApplicationPopup from './ApplicationPopup';
import { ThemeProvider, useMediaQuery } from '@mui/system';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';
import { darken, lighten } from '@mui/system';
import { highContrastContext } from './App';
import LoadingScreen from './LoadingScreen';

// Accordion imports for responsive filter panel
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FilterListIcon from '@mui/icons-material/FilterList';
import { onAuthStateChanged } from 'firebase/auth';

import { motion } from 'framer-motion';
import zIndex from '@mui/material/styles/zIndex';

function Dashboard() {
    // Responsive breakpoint
    const theme = useTheme();
    const darkenColor = (color, factor) => darken(color, factor);
    const lightenColor = (color, factor) => lighten(color, factor);

    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const { highContrast } = useContext(highContrastContext);

    //state variable for loading screen
    const [isLoading, setIsLoading] = useState(true);

    // Get current user to display their name and application CRUD operations
    let user = auth.currentUser;

    React.useEffect(() => {
        document.title = 'Job Capyture - Dashboard';
    }, []);

    const columns = [
        { field: 'positionTitle', headerName: 'Position', width: isMobile ? 130 : 175, flex: 1, minWidth: 130 },
        { field: 'companyName', headerName: 'Company', width: isMobile ? 150 : 175, flex: 1, minWidth: 150 },
        { field: 'location', headerName: 'Location', width: isMobile ? 140 : 150, flex: 1, minWidth: 140 },
        { field: 'appDate', headerName: 'App Date', width: isMobile ? 140 : 150, minWidth: 140 },
        { field: 'salary', headerName: 'Salary', width: isMobile ? 120 : 150, filterable: false, minWidth: 120 },
        { field: 'description', headerName: 'Description', width: isMobile ? 120 : 160, minWidth: 160, flex: 1, filterable: false },
        { field: 'status', headerName: 'Status', width: isMobile ? 120 : 150, minWidth: 120, filterable: false },
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
    const userRef = useRef(null);

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

    const chartData = Object.entries(counts || {})
        .filter(([status, count]) => count > 0 && status.toLowerCase() !== "total")
        .map(([status, count]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1),
            count,
        }));

    const barColors = highContrast ? ['#93C572',
        '#00C2CC',
        '#FF99CC',
        '#CF9FFF',
        '#F4C430'
    ] : [
        theme.palette.primary.light,
        darkenColor(theme.palette.primary.light, 0.25),
        lightenColor(theme.palette.primary.dark, 0.25),
        lightenColor(theme.palette.primary.dark, 0.5),
        darkenColor(theme.palette.primary.dark, 0.3),
        theme.palette.primary.dark,
    ];

    const pieColors = highContrast ? ['#93C572',
        '#00C2CC',
        '#FF99CC',
        '#CF9FFF',
        '#F4C430'
    ] : [
        theme.palette.primary.light,
        darkenColor(theme.palette.primary.light, 0.25),
        lightenColor(theme.palette.primary.dark, 0.25),
        lightenColor(theme.palette.primary.dark, 0.5),
        darkenColor(theme.palette.primary.dark, 0.3),
        theme.palette.primary.dark,
    ];

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

    const displayedColumns = columns.filter(column => selectedColumns.includes(column.field));

    const [date, setDate] = React.useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const uid = userRef.current?.uid;
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
                        setAllRows(dataArray);
                        setRows(dataArray);
                    });
                    setIsLoading(false);
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
            userRef.current = us;
            getData();
        })
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}
            {!isLoading && (


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
                        <Box sx={{ marginBottom: '25px' }}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <Typography variant="h4" sx={{ fontSize: 28, fontWeight: 'bold', marginBottom: '2px' }}>
                                    Application Overview
                                </Typography>
                            </motion.div>
                            {counts.total === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <Typography variant="body1" sx={{ fontSize: 16, color: 'text.secondary', marginBottom: '30px' }}>
                                        Start adding applications to receive insightful visualizations about your job application process.
                                    </Typography>
                                </motion.div>
                            ) : (
                                <>
                                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                                        <Box flex={1} display="flex" flexDirection="column" sx={{ alignItems: 'center', justifyContent: 'center', padding: { xs: '0', md: '20px' }, width: { xs: '100%', md: '65%' } }}>
                                            {/* Charts */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                className="w-full"
                                            >
                                                <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
                                                            <Tab label="Bar Chart" />
                                                            <Tab label="Pie Chart" />
                                                        </Tabs>
                                                    </Box>
                                                    <Box sx={{ width: '100%', height: { xs: '300px', md: '400px' } }}>
                                                        {selectedTab === 0 ? (
                                                            <BarChartComponent data={chartData} barColors={barColors} />
                                                        ) : (
                                                            <PieChartComponent data={chartData} pieColors={pieColors} />
                                                        )}
                                                    </Box>
                                                </Box>
                                            </motion.div>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: '35%' }, gap: { xs: '0', md: '20px' }, marginTop: { xs: '1rem', md: '0' } }}>
                                            {Object.entries(counts)
                                                .filter(([status, count]) => count > 0)
                                                .map(([status, count]) => {
                                                    let displayText = '';
                                                    switch (status.toLowerCase()) {
                                                        case 'total':
                                                            displayText = (<span style={{ fontWeight: 700, fontSize: { xs: '1.2 rem', md: '1.3 rem', lg: '1.5 rem', xl: '1.5 rem' } }}>
                                                                {count === 1 ? 'total application' : 'total applications'}
                                                            </span>
                                                            );
                                                            break;
                                                        case 'applied':
                                                            displayText = `${count === 1 ? 'job' : 'jobs'} under review`;
                                                            break;
                                                        case 'screening':
                                                            displayText = `screening upcoming`;
                                                            break;
                                                        case 'interview':
                                                            displayText = `${count === 1 ? 'interview' : 'interviews'} upcoming`;
                                                            break;
                                                        case 'offer':
                                                            displayText = `offer${count === 1 ? '' : 's'} coming your way!`;
                                                            break;
                                                        case 'rejected':
                                                            displayText = `${count === 1 ? 'time' : 'times'} they missed out`;
                                                            break;
                                                        default:
                                                            displayText = `${count === 1 ? 'job' : 'jobs'} without a status`;
                                                    }

                                                    return (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ duration: 0.3, delay: 0.3 }}
                                                            key={status}
                                                            style={{
                                                                fontSize: '1.3rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundColor: theme.palette.secondary.light,
                                                                ...(theme.breakpoints.down('sm') && {
                                                                    fontSize: '1rem'
                                                                }),
                                                                marginTop: '0.5rem',
                                                                paddingRight: '3rem',
                                                                paddingLeft: '3rem',
                                                                borderRadius: '25px',
                                                                width: '90%'
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: theme.palette.primary.light,
                                                                    fontWeight: 800,
                                                                    fontSize: status === 'total' ? '2rem' : '1.8rem',
                                                                    marginRight: '10px',
                                                                }}
                                                            >
                                                                {count}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    fontSize: status === 'total' ? { xs: '1.5rem', md: '2rem' } : { xs: '1.1rem', md: '1.8rem' },
                                                                    textAlign: 'center',
                                                                    ...(theme.breakpoints.down('sm') && {
                                                                        fontSize: '1rem',
                                                                    }),
                                                                    margin: '0'
                                                                }}
                                                            >
                                                                {displayText}
                                                            </span>
                                                        </motion.div>
                                                    );
                                                })}
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                        <Divider sx={{ width: '100%', margin: '0 auto', marginBottom: '30px' }} />
                        {/* Job Application Tracker */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            <Typography variant="h4" sx={{ marginBottom: '20px', fontSize: 28, fontWeight: 'bold' }}>
                                Job Application Tracker
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
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
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
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
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
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
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
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
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
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
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
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
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
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
                                checkboxSelection={false}
                                selectionModel={null}

                                sx={{
                                    '& .MuiDataGrid-row:nth-of-type(odd)': {
                                        backgroundColor: 'white',
                                    },
                                    '& .MuiDataGrid-row:nth-of-type(even)': {
                                        backgroundColor: theme.palette.secondary.light,
                                    },
                                }}
                            />
                        </motion.div>
                    </Paper >
                </Box >
            )}
        </>
    );
}

export default Dashboard;