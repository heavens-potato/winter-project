import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
                component={Link}
                to="/profile"
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
        </Box>
    </motion.div>
    )
}

       
export default ResponsiveNav;