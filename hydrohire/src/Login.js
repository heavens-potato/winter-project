import React from 'react';
import './App.css';
import { TextField, Button, Typography, Box, Link, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, createTheme, ThemeProvider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import capybaraLogo from './assets/img/Capybara.png';

const theme = createTheme({
  typography: {
    fontFamily: '"Nunito", sans-serif',
  },
});

function Login() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log('Form submitted! Email: ', email, 'Password: ', password); // placeholder code for authentication logic
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          {/* Capybara Logo */}
          <img src={capybaraLogo} className="App-logo" alt="logo" />

          {/* Title */}
          <Typography variant="h3" gutterBottom>
            HydroHire
          </Typography>

          {/* Login Box Start */}
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ display:'flex', flexDirection:'column', gap:2, width:'350px', margin:'0 auto', }}
          >

            {/* Email Input */}
            <TextField label="Email" type="email" variant="outlined" fullWidth name="email" required />

            {/* Password Input */}
            <FormControl variant="outlined" fullWidth required>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide password' : 'display password'
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {/* Login Button */}
            <Button 
              variant="contained" 
              type="submit" 
              fullWidth
              sx={{
                backgroundColor: '#82cef5',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#67a3c2',
                  color: '#fff',
                }
              }}
            >
              Login
            </Button>

            {/* Sign Up Link */}
            <Typography variant="body1" align="center">
              Don't have an account?{' '}
              <Link href="#signup" underline="hover">
                Sign Up
              </Link>
            </Typography>

          {/* Login Box End */}
          </Box>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default Login;
