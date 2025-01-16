import React, { useState, useEffect } from 'react';
import { FormControl, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Button, Box, Typography } from '@mui/material';

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

    const [submitted, setSubmitted] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!formData.positionTitle || !formData.companyName || !formData.status) {
            return;
        }
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
        setSubmitted(false);
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
                <FormControl
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 2,
                        padding: { xs: 0, md: 2 },
                    }}
                >
                    <FormControl required error={submitted && formData.positionTitle === ''}>
                        <TextField
                            label="Position Title"
                            fullWidth
                            variant="outlined"
                            required
                            name="positionTitle"
                            value={formData.positionTitle}
                            onChange={handleInputChange}
                            onFocus={() => setSubmitted(false)}
                            onBlur={() => setSubmitted(true)}
                            sx={{
                                ...(submitted && formData.positionTitle === '' && { borderColor: 'red', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } })
                            }}
                        />
                        {submitted && formData.positionTitle === '' && (
                            <Typography color="error" variant="body2">
                                Please enter Position Title
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl fullWidth required error={Boolean(formData.companyName)}>
                        <TextField
                            label="Company Name"
                            fullWidth
                            variant="outlined"
                            required
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            onFocus={() => setSubmitted(false)}
                            onBlur={() => setSubmitted(true)}
                            sx={{
                                ...(submitted && formData.companyName === '' && { borderColor: 'red', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } })
                            }}
                        />
                        {submitted && formData.companyName === '' && (
                            <Typography color="error" variant="body2">
                                Please enter Company Name
                            </Typography>
                        )}
                    </FormControl>
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
                        required
                    />
                    <TextField
                        label="Salary"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                    />
                    <FormControl required error={submitted && formData.status === ''}>
                        <Select
                            value={formData.status}
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            name="status"
                            onChange={handleInputChange}
                            onBlur={() => setSubmitted(true)}
                            required
                        >
                            <MenuItem value="" disabled>Status</MenuItem>
                            <MenuItem value="Applied">Applied</MenuItem>
                            <MenuItem value="Screening">Screening</MenuItem>
                            <MenuItem value="Interview">Interview</MenuItem>
                            <MenuItem value="Offer">Offer</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                        {submitted && formData.status === '' && (
                            <Typography color="error" variant="body2">
                                Please select a Status
                            </Typography>
                        )}
                    </FormControl>
                    <Box sx={{ gridColumn: { xs: 'auto', md: 'span 2' } }}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Use this space for your resume URL, job notes, or anything else relevant."
                        />
                    </Box>
                </FormControl>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    padding: { xs: '0 1.5rem 1.5rem 1.5rem', md: '0 2.5rem 2.5rem 2.5rem' }
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
