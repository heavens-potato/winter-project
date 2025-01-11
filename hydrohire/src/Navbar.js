import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Dialog, DialogTitle, DialogContent, IconButton, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useMediaQuery } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import ResponsiveNav from './ResponsiveNav';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfilePop from './ProfilePop';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  let user = auth.currentUser;

  //Responsive breakpoint
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [showResponsiveNav, setShowResponsiveNav] = useState(false);
  const [openProfilePopup, setOpenProfilePopup] = useState(false);

  const handleMobileClick = () => {
    setShowResponsiveNav(!showResponsiveNav);
    console.log("responsive nav handled.");
  };

  const openResponsiveNav = () => {
    setShowResponsiveNav(true);
  }

  const closeResponsiveNav = () => {
    setShowResponsiveNav(false);
  }

  const openProfilePop = () => {
    setOpenProfilePopup(true);
  };

  const closeProfilePop = () => {
    setOpenProfilePopup(false);
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
            color: (theme) => theme.palette.primary.dark,
            fontSize: 36,
            fontWeight: 'bold',
            padding: '1rem',
          }}>
          hydroHire
        </Typography>

        {isMobile ? (
          //if the screen is of mobile width, render the hamburger icon
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openResponsiveNav}
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
                  zIndex: 998,
                }}
              >
                <ResponsiveNav onClose={closeResponsiveNav} />
              </div>
            )}
          </>
        ) : (

          // If the screen is above mobile width, render the full navbar 
          <Box sx={{ display: 'flex', gap: 6, padding: '1rem' }}>
            <Button component={Link} to="/about" sx={{ color: (theme) => theme.palette.primary.dark, fontSize: '20px', fontWeight: 'bold' }}>
              About
            </Button>
            <Button component={Link} to="/contact" sx={{ color: (theme) => theme.palette.primary.dark, fontSize: '20px', fontWeight: 'bold' }}>
              Contact
            </Button>
            {isLoggedIn ? (
              <>
                {openProfilePopup && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 999999,
                    }}
                  >
                    <ProfilePop onClose={closeProfilePop} />
                  </div>
                )}

                {/* Dashboard Button */}
                <Button
                  component={Link}
                  to="/dashboard"
                  sx={{
                    color: (theme) => theme.palette.primary.white,
                    fontSize: '20px',
                    fontWeight: 'bold',
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    border: '3px solid',
                    borderColor: (theme) => theme.palette.primary.dark,
                    borderRadius: '30px',
                    padding: '0.5rem 1.5rem',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.white,
                      color: (theme) => theme.palette.primary.dark,
                    },
                  }}
                >
                  Dashboard
                </Button>

                {/* My Profile Button */}
                <PersonIcon
                  onClick={openProfilePop}
                  sx={{
                    alignItems: 'center',
                    color: (theme) => theme.palette.primary.white,
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    fontSize: '50px',
                    border: '3px solid',
                    borderColor: (theme) => theme.palette.primary.dark,
                    borderRadius: '30px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.white,
                      color: (theme) => theme.palette.primary.dark,
                    },
                  }}
                />
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
