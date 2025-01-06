import React, { useEffect, useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, IconButton, AppBar, Toolbar, Typography, Button, Box, InputLabel, OutlinedInput, InputAdornment, FormControl } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { motion } from 'framer-motion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function checkPasswordStrength(password) {
  const passwordRegex = new RegExp (/^(?=.*[@$!%*?&])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%?&]{8,}$/);
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailRegex.test(email);
}

function ProfilePop( { onClose } ) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

      const handleSubmit = async (event) => {
        
      }

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen overflow-scroll"
        >
          <div>
            <div className="flex flex-row justify-between items-center bg-[#FFB165] p-10 rounded-t-lg">
                <h1 className="text-4xl font-bold">My Profile</h1>
                <HighlightOffIcon onClick={ onClose } sx={{ cursor: 'pointer' }}/>
            </div>
            <div className="flex flex-row justify-between bg-white pl-10 pr-10 rounded-b-lg gap-40">
              <div className="flex flex-col mt-10">
                <div className="flex flex-row gap-5 items-center">
                  <SettingsIcon />
                  <h3 className="text-3xl font-bold">Edit Profile</h3>
                </div>
                <h4 className="text-xl font-bold mt-4 mb-2">Email</h4>
                <TextField label="Email" type="email" variant="outlined" fullWidth name="email"/>
                <h4 className="text-xl font-bold mt-4 mb-2">Display Name</h4>
                <TextField label="Display Name" type="text" variant="outlined" fullWidth name="displayName"/>
                <Button 
                  variant="contained" 
                  type="submit" 
                  fullWidth
                  sx={{
                    fontSize: 20,
                    backgroundColor: (theme) => theme.palette.primary.main, 
                    color: 'white',  
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                      color: (theme) => theme.palette.primary.white,  
                    },
                    marginTop: 4,
                    marginBottom: 4,
                    borderRadius: 2,
                  }}
                >
                SAVE
                </Button>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx ={{ color: 'white' }}/>}
                    aria-controls="panel-content"
                    id="panel-header"
                    sx = {{
                      color: 'white',
                      backgroundColor: (theme) => theme.palette.primary.dark,
                      borderRadius: 2,
                      marginBottom: 10,
                    }}
                  >
                    <Typography>Change Password</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingBottom: 5 }}>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0, width: '350px', margin: '0 auto' }}
                  >

                    {/* Old Password Input */}
                    <h4 className="text-xl font-bold mt-4 mb-2">Old Password</h4>
                    <FormControl variant="outlined" fullWidth >
                    <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="oldPassword"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide password' : 'display password'
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Old Password"
                    />
                    </FormControl>


                    {/* New Password Input */}
                    <h4 className="text-xl font-bold mt-4 mb-2">New Password</h4>
                    <FormControl variant="outlined" fullWidth required>
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide password' : 'display password'
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="New Password"
                    />
                    </FormControl>

                    {/* Confirm New Password Input */}
                    <h4 className="text-xl font-bold mt-4 mb-2">Confirm New Password</h4>
                    <FormControl variant="outlined" fullWidth required>
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmNewPassword"
                        placeholder="Passwords must match"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showConfirmPassword ? 'hide password' : 'display password'
                            }
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                            >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Confirm New Password"
                      />
                    </FormControl>


                    {/* Update Button */}
                    <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                        fontSize: 20,
                        backgroundColor: (theme) => theme.palette.primary.main, 
                        color: (theme) => theme.palette.primary.white,  
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.primary.dark,
                          color: (theme) => theme.palette.primary.white,  

                        },
                        marginTop: 4,
                        marginBottom: 4,
                        borderRadius: 2,
                    }}
                    >
                    UPDATE PASSWORD
                  </Button>
 
                  {/* Error & Success Message Display */}
                    {errorMessage && (
                    <Typography color="error" align="center">
                        {errorMessage}
                      </Typography>
                    )}
                    {successMessage && (
                      <Typography color="success.main" align="center">
                        {successMessage}
                      </Typography>
                    )}             
                  </Box>      
                  </AccordionDetails>
                </Accordion>
              </div>
              <div>
                <div className="flex flex-row gap-5 mt-10 items-center">
                  <PaletteIcon />
                  <h3 className="text-3xl font-bold">Theme Color</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    )
}

export default ProfilePop;