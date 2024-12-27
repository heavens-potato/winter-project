import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import capybaraLogo from './assets/img/Capybara.png';

function Landing() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Half */}
      <Grid container item xs={6} justifyContent="center" alignItems="center">
        <img src={capybaraLogo} alt="Capybara" style={{ width: '80%', height: 'auto' }} />
      </Grid>

      {/* Right Half */}
      <Grid container item xs={6} justifyContent="center" alignItems="center" sx={{ padding: 3 }}>
        <Box sx={{ width: '80%' }}>
          {/* Heading */}
          <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            Take charge of your job hunt with hydroHire
          </Typography>

          {/* Paragraph */}
          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: 2 }}>
            Say goodbye to scattered spreadsheets and lost opportunities. Designed by college students, for college students, hydroHire is here to help you track, visualize, and optimize your job search in one seamless platform.
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            {/* Sign Up Button */}
            <Link to="/signup" style={{ textDecoration: 'none', marginRight: 2 }}>
              <Button 
                variant="contained" 
                sx={{ 
                    backgroundColor: (theme) => theme.palette.primary.light, 
                    color: (theme) => theme.palette.primary.white, 
                    width: '292px', height: '72px', borderRadius: '10px', fontSize: 32 }}>
                Sign Up
              </Button>
            </Link>

            {/* Login Button */}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained" 
                sx={{ 
                    backgroundColor: (theme) => theme.palette.primary.white, 
                    color: (theme) => theme.palette.primary.light,
                    borderColor: (theme) => theme.palette.primary.light,
                    border: '4px solid',
                    width: '292px', height: '72px', borderRadius: '10px', fontSize: 32 }}>
                Log In
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Landing;
