import React from 'react';
import { Divider, Box, TextField, IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Select, MenuItem, useTheme, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';

const columns = [
  { id: 'positionTitle', label: 'Position', width: 150 },
  { id: 'companyName', label: 'Company', width: 150 },
  { id: 'location', label: 'Location', width: 150 },
  { id: 'appDate', label: 'App Date', width: 100, format: (value) => new Date(value).toLocaleDateString('en-US') },
  {
    id: 'salary',
    label: 'Salary',
    width: 120,
    format: (value) => (value !== null && value !== undefined ? `$${value.toLocaleString('en-US')}` : 'N/A'),
  },
  {
    id: 'description',
    label: 'Description',
    width: 250,
    style: { wordWrap: 'break-word', whiteSpace: 'normal' },
  },
  { id: 'status', label: 'Status', width: 150 },
  { id: 'actions', label: 'Actions', width: 100 },
];

// Sample data - delete once firestore collection is ready
const rows = [
  { id: '1', positionTitle: 'Software Engineer', companyName: 'Tech Corp', location: 'San Francisco, CA', appDate: '2024-01-15', salary: 120000, description: 'Excited about the role.', status: 'Applied' },
  { id: '2', positionTitle: 'Data Analyst', companyName: 'Innovate LLC', location: 'New York, NY', appDate: '2024-01-20', salary: 90000, description: 'Scheduled for next week.', status: 'Interview' },
  { id: '3', positionTitle: 'Product Manager', companyName: 'Buildit Inc.', location: 'Austin, TX', appDate: '2024-01-10', salary: 110000, description: 'Pending final decision.', status: 'Offer' },
  { id: '4', positionTitle: 'UI/UX Designer', companyName: 'DesignPro', location: 'Seattle, WA', appDate: '2024-01-12', salary: null, description: 'Position filled.', status: 'Rejected' },
  { id: '5', positionTitle: 'Backend Developer', companyName: 'CodeWorld', location: 'Boston, MA', appDate: '2024-01-18', salary: 95000, description: 'Submitted resume and cover letter.', status: 'Applied' },
];

function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState(rows);
  const [search, setSearch] = React.useState('');

  const theme = useTheme();

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Navbar />
        <Paper sx={{ width: 'calc(100% - 40px)', margin: '20px auto', padding: '10px', borderRadius: '8px' }}>
        {/* Application Overview */}
        <Box sx={{ marginBottom: '30px' }}>
          <Typography variant="h4" sx={{ fontSize: 28, fontWeight: 'bold', marginBottom: '10px' }}>
            Application Overview
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16, color: theme.palette.text.secondary, marginBottom: '20px' }}>
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
            sx={{ flexGrow: 1, borderRadius: '40px', padding: '10px',
                '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                paddingLeft: '12px',
                }, }}
            slotProps={{
                input: {
                startAdornment: (
                    <IconButton position="start">
                    <SearchIcon />
                    </IconButton>
                ),
                },
            }}
            />
            
            {/* Add New Application Button */}
            <Button 
                variant="contained" 
                color="primary" 
                sx={{ 
                    marginLeft: '20px', 
                    fontSize: 18,
                    backgroundColor: (theme) => theme.palette.primary.main, 
                    color: (theme) => theme.palette.primary.dark,  
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                        color: (theme) => theme.palette.primary.white,  
                    },
                    }}>
            Add New Application
            </Button>
        </Box>

        {/* Table */}
        <TableContainer>
            <Table size="small">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    style={{ width: column.width, whiteSpace: 'nowrap', fontSize: 18, fontWeight: 'bold'
                    }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                    <TableRow 
                        key={row.id}
                        style={{
                            backgroundColor: index % 2 === 0 
                            ? theme.palette.primary.white 
                            : theme.palette.secondary.light,
                        }}
                    >
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell
                            key={column.id}
                            style={{
                            fontSize: 16,
                            width: column.width,
                            ...(column.style || {}),
                            }}
                        >
                            {column.id === 'actions' ? (
                                <Box sx={{ display: 'flex', gap: '8px' }}>
                                {/* Edit Icon */}
                                <IconButton
                                onClick={() => console.log(`Edit ${row.id}`)}
                                sx={{ color: theme.palette.primary.dark }}
                                >
                                <EditIcon />
                                </IconButton>
                                {/* Delete Icon */}
                                <IconButton
                                onClick={() => console.log(`Delete ${row.id}`)}
                                sx={{ color: theme.palette.primary.dark }}
                                >
                                <DeleteIcon />
                                </IconButton>
                            </Box>
                            ) : column.id === 'status' ? (
                            <Select
                                value={value}
                                onChange={(event) =>
                                handleStatusChange(row.id, event.target.value)
                                }
                                size="small"
                                sx={{
                                minWidth: 130,
                                borderRadius: '15px',
                                }}
                            >
                                <MenuItem value="Saved">Saved</MenuItem>
                                <MenuItem value="Applied">Applied</MenuItem>
                                <MenuItem value="Screening">Screening</MenuItem>
                                <MenuItem value="Interview">Interview</MenuItem>
                                <MenuItem value="Offer">Offer</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                            ) : column.format ? (
                            column.format(value)
                            ) : (
                            value
                            )}
                        </TableCell>
                        );
                    })}
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    </Box>
  );
}

export default Dashboard;
