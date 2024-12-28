import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import capybaraLogo from './assets/img/Capybara.png';

function Landing() {
  const features = [
    {
      title: 'Feature 1',
      description: 'Description of Feature 1',
    },
    {
      title: 'Feature 2',
      description: 'Description of Feature 2',
    },
    {
      title: 'Feature 3',
      description: 'Description of Feature 3',
    },
  ];

  return (
    <div>
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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

    {/* three features section */}
    <Grid container spacing={3} sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: { xs: 5 , md: 15 },
          gap: 5
        }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={4} key={index} sx={{
          minWidth: { xs: 350, md: 600, lg: 350 },
          borderRadius: '15px',
        }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" sx={{
                fontSize: 24,
                color: (theme) => theme.palette.primary.main,
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
                padding: { xs: 2, md: 3 }
                }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{
                justifyContent: 'center',
                textAlign: 'center',
              }}>
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>

  );
}

export default Landing;
