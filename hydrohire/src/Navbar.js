import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#D9D9D9', boxShadow: 'none', height: '101px', padding: '0' }}>
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
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#000', fontSize: 38, padding: '1rem' }}>
          hydroHire
        </Typography>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
