import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Button, Box } from '@mui/material';

const ApplicationPopup = ({
    open,
    handleClose,
    handleSubmit,
    title,
    actionButton,
    appData
}) => {
    const [formData, setFormData] = useState({
        positionTitle: '',
        companyName: '',
        location: '',
        appDate: '',
        salary: '',
        status: '',
        resumeVersion: '',
        coverLetterVersion: '',
        description: '',
    });

    useEffect(() => {
        if (appData) {
            setFormData({
                positionTitle: appData.positionTitle,
                companyName: appData.companyName,
                location: appData.location,
                appDate: appData.appDate,
                salary: appData.salary,
                status: appData.status,
                resumeVersion: appData.resumeVersion,
                coverLetterVersion: appData.coverLetterVersion,
                description: appData.description,
            });
        } else {
            setFormData({
                positionTitle: '',
                companyName: '',
                location: '',
                appDate: '',
                salary: '',
                status: '',
                resumeVersion: '',
                coverLetterVersion: '',
                description: '',
            });
        }
    }, [appData, open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e, formData);
    };

    const handleDialogClose = () => {
        handleClose();
        setFormData({
            positionTitle: '',
            companyName: '',
            location: '',
            appDate: '',
            salary: '',
            status: '',
            resumeVersion: '',
            coverLetterVersion: '',
            description: '',
        });
    };

    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    overflow: 'hidden',
                }
            }}
        >
            <DialogTitle sx={{ fontSize: 28, fontWeight: 'bold' }}>{title}</DialogTitle>
            <DialogContent sx={{ borderRadius: '20px' }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 2,
                        padding: { xs: 0, md: 2 },
                    }}
                >
                    <TextField
                        label="Position Title"
                        fullWidth
                        variant="outlined"
                        required
                        name="positionTitle"
                        value={formData.positionTitle}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Company Name"
                        fullWidth
                        variant="outlined"
                        required
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        variant="outlined"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Application Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        name="appDate"
                        value={formData.appDate}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Salary"
                        fullWidth
                        variant="outlined"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                    />
                    <Select
                        value={formData.status}
                        fullWidth
                        displayEmpty
                        variant="outlined"
                        required
                        name="status"
                        onChange={handleInputChange}
                        sx={{ backgroundColor: 'white' }}
                    >
                        <MenuItem value="" disabled>Status</MenuItem>
                        <MenuItem value="Applied">Applied</MenuItem>
                        <MenuItem value="Screening">Screening</MenuItem>
                        <MenuItem value="Interview">Interview</MenuItem>
                        <MenuItem value="Offer">Offer</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                    <Box sx={{ gridColumn: {xs: 'auto', md: 'span 2'} }}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    padding: {xs: '0 1.5rem 1.5rem 1.5rem', md: '0 2.5rem 2.5rem 2.5rem' }
                }}
            >
                <Button
                    onClick={handleDialogClose}
                    variant="outlined"
                    sx={{
                        fontSize: 18,
                        borderColor: (theme) => theme.palette.primary.light,
                        color: (theme) => theme.palette.primary.light,
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.light,
                            color: (theme) => theme.palette.primary.white,
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleFormSubmit}
                    type="submit"
                    variant="contained"
                    sx={{
                        fontSize: 18,
                        backgroundColor: (theme) => theme.palette.primary.light,
                        color: (theme) => theme.palette.primary.dark,
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.dark,
                            color: (theme) => theme.palette.primary.white,
                        },
                    }}
                >
                    {actionButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ApplicationPopup;
