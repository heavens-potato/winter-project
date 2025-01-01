import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { motion } from 'framer-motion';

function ResponsiveNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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