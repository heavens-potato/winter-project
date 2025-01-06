import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Button, Paper, Divider, Select, MenuItem, Typography, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { doc, setDoc, getDoc, onSnapshot, collection } from "firebase/firestore";
import { auth, db } from './firebase'; // Import auth from firebase.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from './Navbar';
import ApplicationPopup from './ApplicationPopup';

const columns = [
  { field: 'positionTitle', headerName: 'Position', width: 175 },
  { field: 'companyName', headerName: 'Company', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'appDate', headerName: 'App Date', width: 150 },
  { field: 'salary', headerName: 'Salary', width: 150 },
  { field: 'description', headerName: 'Description', width: 250, flex: 1 },
  { field: 'status', headerName: 'Status', width: 150, editable: true },
  { 
    field: 'actions', 
    headerName: 'Actions', 
    width: 100, 
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: '8px' }}>
        {/* Edit Icon */}
        <IconButton onClick={() => params.row.handleEditClick(params.row)}>
          <EditIcon />
        </IconButton>
        {/* Delete Icon */}
        <IconButton onClick={() => console.log(`Delete ${params.id}`)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ) 
  },
];

// Sample data
let rows = [
  { id: '1', positionTitle: 'Software Engineer', companyName: 'Tech Corp', location: 'San Francisco, CA', appDate: '2024-01-15', salary: '120000/yr', description: 'Excited about the role.', status: 'Applied' },
  { id: '2', positionTitle: 'Data Analyst', companyName: 'Innovate LLC', location: 'New York, NY', appDate: '2024-01-20', salary: '90000/yr', description: 'Scheduled for next week.', status: 'Interview' },
  { id: '3', positionTitle: 'Product Manager', companyName: 'Buildit Inc.', location: 'Austin, TX', appDate: '2024-01-10', salary: '110000/yr', description: 'Pending final decision.', status: 'Offer' },
  { id: '4', positionTitle: 'UI/UX Designer', companyName: 'DesignPro', location: 'Seattle, WA', appDate: '2024-01-12', salary: '123480/yr', description: 'Position filled.', status: 'Rejected' },
  { id: '5', positionTitle: 'Backend Developer', companyName: 'CodeWorld', location: 'Boston, MA', appDate: '2024-01-18', salary: '95000/yr', description: 'Submitted resume and cover letter.', status: 'Applied' },
];

function Dashboard() {
  const [pageSize, setPageSize] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [date, setDate] = React.useState('');
  const [selectedColumns, setSelectedColumns] = React.useState(columns.map(col => col.field));
  const [selectedApp, setSelectedApp] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState([]);
  const theme = useTheme();

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
    if (selectedApp) {
        setRows(rows.map(row => row.id === selectedApp.id ? { ...row, ...updatedAppData } : row ));
    } else {
        setRows(prevRows => [...prevRows, { id: Date.now().toString(), ...updatedAppData }]);
    }
    console.log("Add works!");
    setOpenDialog(false);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    console.log(event.target);
  };

  const handleColumnsChange = (event) => {
    setSelectedColumns(event.target.value);
  };

  const displayedColumns = columns.filter(column => selectedColumns.includes(column.field));

  useEffect(() => {
    const getData = async () =>{
      try{
        let user = auth.currentUser;
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
            console.log(dataArray);
            for(let i = 0; i < rows.length; i++) {
              // rows.push(dataArray[i]);
              if(i < dataArray.length){
                rows[i].positionTitle = dataArray[i].jobTitle;
                rows[i].appDate = dataArray[i].appDate;
                rows[i].companyName = dataArray[i].companyName;
                rows[i].location = dataArray[i].location;
                rows[i].salary = dataArray[i].salary;
                rows[i].description = dataArray[i].notes;
                rows[i].status = dataArray[i].status;
              } else {
                rows[i].positionTitle = "";
                rows[i].appDate = "";
                rows[i].companyName = "";
                rows[i].location = "";
                rows[i].salary = 0;
                rows[i].description = "";
                rows[i].status = "";
              }
            }
          });
          return unsubscribe;
        } else {
          console.log("No such document!");
          return () => {}; // No-op unsubscribe
        }
      } catch(error) {
        console.error("Error fetching data:");
        return () => {}; // No-op unsubscribe
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Paper sx={{ width: 'calc(100% - 40px)', margin: '20px auto', padding: '10px', borderRadius: '8px' }}>
        {/* Application Overview */}
        <Box sx={{ marginBottom: '35px' }}>
          <Typography variant="h4" sx={{ fontSize: 28, fontWeight: 'bold', marginBottom: '30px' }}>
            Application Overview
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16, color: 'text.secondary', marginBottom: '30px' }}>
            Start adding applications to receive insightful visualizations about your job application process.
          </Typography>
          <Divider sx={{ width: '100%', margin: '0 auto' }} />
        </Box>

        {/* Job Application Tracker */}
        <Typography variant="h4" sx={{ marginBottom: '20px', fontSize: 28, fontWeight: 'bold' }}>
          Job Application Tracker
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          {/* Search Bar */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by position, company, or location"
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
          {/* Add New Application Button */}
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
                }}>
            + Add New Application
          </Button>

          {/* Add Application Popup */}
          <ApplicationPopup
            open={openDialog}
            handleClose={handleDialogClose}
            handleSubmit={handleSubmit}
            title="Add New Job"
            actionButton="Add"
            appData={selectedApp}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', gap: 6 }}>
            {/* Status Filter */}
            <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                <MenuItem value="" disabled>Select Status</MenuItem>
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
                onChange={(e) => setDate(e.target.value)}
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

            {/* Columns Displayed */}
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
        </Box>

        {/* DataGrid */}
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={displayedColumns}
            pageSize={pageSize}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            disableSelectionOnClick
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}
            selectionModel={null}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? `bg-${theme.palette.primary.white}` : `bg-[${theme.palette.secondary.light}]`
            }
          />
        </div>
      </Paper>
    </Box>
  );
}

export default Dashboard;
