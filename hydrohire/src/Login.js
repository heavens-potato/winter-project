import React, {useState} from 'react';
import './App.css';
import { TextField, Button, Typography, Box, Link, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import capybaraLogo from './assets/img/Capybara.png';
import { auth } from './firebase'; // Import auth from firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';

function validateEmail(email) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailRegex.test(email);
}

function Login() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const res = validateEmail(email); //check if email matches format
    const password = event.target.password.value;

    if(res){ //case if email is valid
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login Success!');
      } catch (error) {
        setErrorMessage('Failed to login.');
        console.log('Failure');
      }
    } else { //case if email is invalid
        setErrorMessage('Invalid Email');
    }
  }

  return (
    <div className="Login">
        <header className="Login-header">
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
                fontSize: 24,
                backgroundColor: (theme) => theme.palette.primary.main, 
                color: (theme) => theme.palette.primary.dark,  
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  color: (theme) => theme.palette.primary.white,  
                },
              }}
            >
              Log In
            </Button>

            {/* Error Message Display */}
            {errorMessage && (
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            )}

            {/* Sign Up Link */}
            <Typography variant="body1" align="center">
              Don't have an account?{' '}
              <Link href="/signup" underline="hover" sx={{ fontWeight: 'bold' }}>
                Sign Up
              </Link>
            </Typography>

          {/* Login Box End */}
          </Box>
        </header>
      </div>
  );
}

export default Login;
