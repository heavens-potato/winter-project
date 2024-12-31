import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function Navbar() {
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
    <AppBar position="static" sx={{ boxShadow: 'none', height: '101px', padding: '0' }}>
      <Toolbar
        sx={{
            height: '100%',
            padding: '0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}
      >
        {/* Title */}
        <Typography 
            variant="h6"
            sx={{ 
                flexGrow: 1, 
                color: '#313541', 
                fontSize: 36, 
                fontWeight: 'bold', 
                padding: '1rem', }}>
          hydroHire
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 6, padding: '1rem' }}>
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
