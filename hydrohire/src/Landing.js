import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Grid from '@mui/material/Grid2';
import capybaraLogo from './assets/img/Capybara.png';
import Navbar from './Navbar';

function Landing() {

  const features = [
    {
      title: 'Feature 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
      title: 'Feature 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
      title: 'Feature 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
  ];

  return (
    <div>
    <Navbar />
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column', lg: 'row '}, overflow: 'hidden', minHeight: '90vh', flexGrow: 1, position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
      {/* Left Half */}
      <motion.div
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 150, damping: 30 }}
        layout
      >
        <Grid container item xs={6} justifyContent="center" alignItems="center">
          <img src={capybaraLogo} alt="Capybara" style={{ width: { sm: '30%', lg: '80%' }, height: 'auto' }} />
        </Grid>
      </motion.div>
      
      {/* Right Half */}
      <motion.div
        initial={{ x: 100, opacity: 0}} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.3, delay: 0.3, type: 'spring', stiffness: 150, damping: 30 }}
        layout
      >
      <Grid container item xs={6} justifyContent="center" alignItems="center" sx={{ padding: 3 }}>
        <Box sx={{ width: '80%' }}>
          {/* Heading */}
          <Typography variant="h3"  sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            Take charge of your job hunt with hydroHire
          </Typography>

          {/* Paragraph */}
          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: 2 }}>
            Say goodbye to scattered spreadsheets and lost opportunities. Designed by college students, for college students, hydroHire is here to help you track, visualize, and optimize your job search in one seamless platform.
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row'}, justifyContent: { md:'space-evenly', lg:'space-between'} , marginTop: 3, alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0}} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              {/* Sign Up Button */}
              <Link to="/signup" style={{ textDecoration: 'none', marginRight: {xs: 0, md: 2, lg: 2} }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                      backgroundColor: (theme) => theme.palette.primary.light, 
                      color: (theme) => theme.palette.primary.white, 
                      width: '292px', height: '72px', borderRadius: {xs: '5px', md: '10px'} , fontSize: { xs: 20, md: 32 } }}>
                  Sign Up
                </Button>
              </Link>
            </motion.div>
            
            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0}} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                      backgroundColor: (theme) => theme.palette.primary.white, 
                      color: (theme) => theme.palette.primary.light,
                      borderColor: (theme) => theme.palette.primary.light,
                      border: '4px solid',
                      width: '292px', height: '72px', borderRadius: '10px', fontSize: { xs: 20, md: 32 }, marginTop: {xs: 3, md: 0 } }}>
                  Log In
                </Button>
              </Link>
            </motion.div>
          </Box>
        </Box>
        </Grid>
      </motion.div>
    </Box>

    {/* 3 Features */}
    <motion.div
      initial = {{ opacity: 0 }}
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }}
      transition = {{ duration: 0.3 }}
    >
    <Grid container spacing={3} sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: { xs: 3 , md: 15 },
          gap: {xs: 3, md: 5}
        }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={4} key={index} sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column', lg: 'column', xl: 'row'},
          minWidth: { xs: 350, md: 600, lg: 300 },
          maxWidth: { lg: 330, xl: 400 },
          // borderRadius: 25,
        }}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }} 
            viewport={{ once: true }}
            transition = {{ duration: 0.3, delay: 0.3 }}
          >
          <Card>
            <CardContent
              sx={{
                padding: { xs: 1 , md: 1, lg: 3 },
              }}
            >
              <Typography variant="h5" component="h2" sx={{
                fontSize: 32,
                color: (theme) => theme.palette.primary.main,
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
                padding: { xs: 2, lg: 3 }
                }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: 18,
                justifyContent: 'center',
                textAlign: 'center',
                wordWrap: 'break-word',
              }}>
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
    </motion.div>
    </div>
  );
}

export default Landing;
