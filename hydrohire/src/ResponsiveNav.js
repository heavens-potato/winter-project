import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Dialog, DialogTitle, DialogContent, IconButton, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';

function ResponsiveNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [openProfilePopup, setOpenProfilePopup] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }); 
      return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log('Logged out');
          if (window.location.pathname === '/dashboard') {
            navigate('/');
          }
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
    }

    const handleProfileClick = () => {
        setOpenProfilePopup(true);
    }


    const handleClosePopup = () => {
        setOpenProfilePopup(false);
    } 

    return (
    <motion.div 
        className="bg-[#FFB165] h-screen w-3/4 z-50 absolute right-0"
        initial = {{ x:100 }}
        animate = {{ x: 0 }}
        exit = {{ x: 100 }}
        transition = {{ duration: 0.3 }}
    > 
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '1rem', paddingTop: '6rem'}}>
            <Button component={Link} to="/about" sx={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
            About
            </Button>
            <Button component={Link} to="/contact" sx={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
            Contact
            </Button>
            {isLoggedIn ? (
            <>
                {/* My Profile Button */}
                <Button
                onClick={handleProfileClick}
                sx={{
                    color: 'black',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    border: '3px solid black',
                    borderRadius: '30px',
                    padding: '0.5rem 1.5rem',
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                }}
                >
                My Profile
                </Button>

                {/* Dashboard Button */}
                <Button
                component={Link}
                to="/dashboard"
                sx={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    backgroundColor: 'black',
                    border: '3px solid black',
                    borderRadius: '30px',
                    padding: '0.5rem 1.5rem',
                    '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                    },
                }}
                >
                Dashboard
                </Button>

                {/* Logout Button */}
                <Button
                    onClick={handleLogout}
                    sx={{
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        backgroundColor: 'transparent',
                        border: '3px solid black',
                        borderRadius: '30px',
                        padding: '0.5rem 1.5rem',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                        },
                    }}
                >
                    Logout
                </Button>
            </>
            ) : (
            <>
                {/* Sign Up Button */}
                <Button
                component={Link}
                to="/signup"
                sx={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    backgroundColor: 'black',
                    border: '3px solid black',
                    borderRadius: '30px',
                    padding: '0.5rem 1.5rem',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: 'black',
                    },
                }}    
                >
                Sign Up
                </Button>

                {/* Log In Button */}
                <Button
                component={Link}
                to="/login"
                sx={{
                    color: 'black',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    border: '3px solid black',
                    borderRadius: '30px',
                    padding: '0.5rem 1.5rem',
                    backgroundColor: 'transparent',
                    '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                    },
                }}
                >
                Log In
                </Button>
            </>
            )}

    {/* Profile Popup Dialog */}
      <Dialog 
        open={openProfilePopup} 
        onClose={handleClosePopup} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
             overflow: 'hidden',
          }
        }}
      >
        <DialogTitle 
          sx={{ backgroundColor: (theme) => theme.palette.primary.light, 
          color: 'white', 
          fontSize: 28, 
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem 1rem 2rem'
          }}
        >
          My Profile
          <IconButton
            size="large" 
            edge="end"
            color="inherit"
            onClick={handleClosePopup}
            sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CancelIcon sx={{ fontSize: 'inherit' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <SettingsIcon sx={{ fontSize: '2rem' }} />
                <Typography sx={{ fontSize: 28, fontWeight: 600 }}>Edit Profile</Typography>
              </Box>
                <TextField label="Display Name" type="text" variant="outlined" fullWidth name="displayName" placeholder="Display name" required />
                <TextField label="Email" type="email" variant="outlined" fullWidth name="email" placeholder="Email address" required />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                      fontSize: 24,
                      backgroundColor: (theme) => theme.palette.primary.main, 
                      color: (theme) => theme.palette.primary.dark,  
                      '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                      color: (theme) => theme.palette.primary.white,  
                      },
                  }}
                  >
                  Save
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                      fontSize: 24,
                      backgroundColor: (theme) => theme.palette.primary.dark,
                      color: (theme) => theme.palette.primary.white,  
                      '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.main, 
                      color: (theme) => theme.palette.primary.dark, 
                      },
                  }}
                  >
                  Change Password
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <PaletteIcon sx={{ fontSize: '2rem' }} />
                <Typography sx={{ fontSize: 28, fontWeight: 600 }}>Theme Color</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
        
    </Box>
    

    </motion.div>
    )
}

       
export default ResponsiveNav;