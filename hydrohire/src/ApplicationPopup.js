import React, { act } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Button, Box } from '@mui/material';

const ApplicationPopup = ({
    open,
    handleClose,
    handleSubmit,
    title,
    actionButton
}) => {
    return (
        <form
          onSubmit={handleSubmit}
          >
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
            <DialogTitle sx={{ fontSize: 28, fontWeight: 'bold'}}>{title}</DialogTitle>
                <DialogContent sx={{ borderRadius: '20px' }}>
                    <Box
                        sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 2,
                        padding: 2,
                        }}
                    >
                        <TextField label="Position Title" fullWidth variant="outlined" required />
                        <TextField label="Company Name" fullWidth variant="outlined" required />
                        <TextField label="Location" fullWidth variant="outlined" />
                        <TextField label="Application Date" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} />
                        <TextField label="Salary" fullWidth variant="outlined" />
                        <Select
                            defaultValue=""
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            required
                            sx={{ backgroundColor: 'white' }}
                            >
                            <MenuItem value="" disabled>Resume Uploaded</MenuItem>
                            <MenuItem value="Default">Default</MenuItem>
                            <MenuItem value="Version 1">Version 1</MenuItem>
                            <MenuItem value="Version 2">Version 2</MenuItem>
                            <MenuItem value="Version 3">Version 3</MenuItem>
                        </Select>
                        <Select
                            defaultValue=""
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            required
                            sx={{ backgroundColor: 'white' }}
                            >
                            <MenuItem value="" disabled>Status</MenuItem>
                            <MenuItem value="Applied">Applied</MenuItem>
                            <MenuItem value="Interview">Interview</MenuItem>
                            <MenuItem value="Offer">Offer</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                        <Select
                            defaultValue=""
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            required
                            sx={{ backgroundColor: 'white' }}
                            >
                            <MenuItem value="" disabled>Cover Letter</MenuItem>
                            <MenuItem value="None">None</MenuItem>
                            <MenuItem value="Version 1">Version 1</MenuItem>
                            <MenuItem value="Version 2">Version 2</MenuItem>
                            <MenuItem value="Version 3">Version 3</MenuItem>
                        </Select>
                        <Box sx={{ gridColumn: 'span 2' }}>
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions 
                    sx={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2, 
                        padding: '0 2.5rem 2.5rem 2.5rem'
                      }}
                >
                    <Button onClick={handleClose} 
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
          </form>
    );
};

export default ApplicationPopup;