import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
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
          <Button component={Link} to="/about" sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            About
          </Button>
          <Button component={Link} to="/contact" sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            Contact
          </Button>
          <Button 
            component={Link} 
            to="/signup" 
            sx={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              backgroundColor: 'white', 
              border: '3px solid white',
              borderRadius: '30px',
              padding: '0.5rem 1.5rem',
              '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    color: (theme) => theme.palette.primary.white,  
                    },
              }}>
            Sign Up
          </Button>
          <Button 
            component={Link} 
            to="/login" 
            sx={{ 
              color: 'white', 
              fontSize: '20px', 
              fontWeight: 'bold',
              border: '3px solid white',
              borderRadius: '30px',
              padding: '0.5rem 1.5rem',
              backgroundColor: 'transparent',
              '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    color: (theme) => theme.palette.primary.white,  
                    },
              }}>
            Log In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
