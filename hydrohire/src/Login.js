import React, {useState} from 'react';
//import './App.css';
import { TextField, Button, Typography, Box, Link, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import capybaraLogo from './assets/img/Capybara.png';
import { auth } from './firebase'; // Import auth from firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';

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
    const res = validateEmail(email); // Check if email matches format
    const password = event.target.password.value;

    if(res){ // Case if email is valid
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login Success!');
      } catch (error) {
        setErrorMessage('Failed to login.');
        console.log('Failure');
      }
    } else { // Case if email is invalid
        setErrorMessage('Invalid Email');
    }
  }

  return (
    <div className="bg-[#D9EAF5] min-h-screen flex items-center justify-center">
        <header className="flex flex-col items-center justify-center text-black text-[calc(10px+2vmin)] w-full max-w-4xl p-6">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            layout
          >
          <div className="bg-white w-90% p-3 md:p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              {/* Left Half */}
              <div className="flex flex-col justify-center flex-1">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Welcome back!
                </Typography>
                <Typography variant="body2">
                  Log in to hydroHire
                </Typography>
              </div>

              {/* Right Half */}
              <div className="flex items-center justify-center">
                <img 
                  src={capybaraLogo} 
                  className="h-[4rem] md:h-[5rem] object-contain" 
                  alt="Capybara Logo" 
                />
              </div>
            </div>

            {/* Login Box Start */}
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              className="font-poppins"
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
          </div>
          </motion.div>
        </header>
      </div>
  );
}

export default Login;
