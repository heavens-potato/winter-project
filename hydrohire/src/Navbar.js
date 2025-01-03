import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useMediaQuery } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import ResponsiveNav from './ResponsiveNav';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);
  const navigate = useNavigate();

  const handleMobileClick = () => {
    setShowResponsiveNav(!showResponsiveNav);
  };

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


              
        {isMobile ? (
          //if the screen is of mobile width, render the hambuurger icon
          <>
          <IconButton 
          size="large" 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          sx={{ mr: 2 }} 
          onClick={ handleMobileClick }
          >
            <MenuIcon />
          </IconButton>

          {showResponsiveNav && (
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%',  
              height: '100%', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              zIndex: 999,
            }} 
            onClick={ handleMobileClick }
          >
            <ResponsiveNav /> 
          </div>
          )}
          </>
        ) : (

          //if the screen is above mobile width, render the full navbar 
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
