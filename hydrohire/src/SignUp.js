import React, {useState} from 'react';
import './App.css';
import { TextField, Button, Typography, Box, Link, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, createTheme, ThemeProvider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import capybaraLogo from './assets/img/Capybara.png';
import { auth } from './firebase'; // Import auth from firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", serif',
  },
});

function SignUp() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long.');
        return;
    }

    if (password !== confirmPassword) {
        setErrorMessage('Passwrods must match.');
        return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Sign up success!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="SignUp">
        <header className="SignUp-header">
          {/* Capybara Logo */}
          <img src={capybaraLogo} className="App-logo" alt="logo" />

          {/* Title */}
          <Typography variant="h3" gutterBottom>
            HydroHire
          </Typography>

          {/* Sign Up Box Start */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '350px', margin: '0 auto' }}
          >
            {/* Email Input */}
            <TextField label="Email" type="email" variant="outlined" fullWidth name="email" placeholder="Email address" required />

            {/* Password Input */}
            <FormControl variant="outlined" fullWidth required>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Must be at least 8 characters"
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

            {/* Confirm Password Input */}
            <FormControl variant="outlined" fullWidth required>
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Passwords must match"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword ? 'hide password' : 'display password'
                      }
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>

            {/* Sign Up Button */}
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
                },
              }}
            >
              Sign Up
            </Button>

            {/* Error & Success Message Display */}
            {errorMessage && (
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            )}
            {successMessage && (
              <Typography color="success.main" align="center">
                {successMessage}
              </Typography>
            )}

            {/* Login Link */}
            <Typography variant="body1" align="center">
              Already have an account?{' '}
              <Link href="/login" underline="hover">
                Log In
              </Link>
            </Typography>

          {/* Sign Up Box End */}
          </Box>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default SignUp;