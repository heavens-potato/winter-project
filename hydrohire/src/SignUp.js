import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import capybaraLogo from './assets/img/Capybara.png';
import { auth, db } from './firebase'; // Import auth from firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function checkPasswordStrength(password) {
  const passwordRegex = new RegExp(/^(?=.*[@$!%*?&])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%?&]{8,}$/);
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailRegex.test(email);
}

function SignUp() {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       window.location.href = "/dashboard";
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  const theme = useTheme();

  React.useEffect(() => {
    document.title = 'hydroHire - Sign Up';
  }, []);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const displayInput = event.target.displayName.value;


    if (!validateEmail(email)) {
      setErrorMessage('Invalid Email');
      return;
    }

    if (!checkPasswordStrength(password)) {
      setErrorMessage('Password must have at least 1 lowercase letter, uppercase letter, number, and special character');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords must match.');
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await setDoc(doc(db, "users", user.uid), {
        displayName: displayInput,
      });
      setErrorMessage("");
      setSuccessMessage("Successfully created an account!");
      console.log('SignUp Success!');
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Failed to login.');
      console.log('Failure');
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.palette.secondary.light }}>
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
                  Welcome!
                </Typography>
                <Typography variant="body2">
                  Sign up to start job tracking
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

            {/* Sign Up Box Start */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '350px', margin: '0 auto' }}
            >
              {/* Name Input */}
              <TextField label="Display Name" type="text" variant="outlined" fullWidth name="displayName" placeholder="Display name" required />

              {/* Email Input */}
              <TextField label="Email" type="email" variant="outlined" fullWidth name="email" placeholder="Email address" required />

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
                  fontSize: 24,
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.dark,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    color: (theme) => theme.palette.primary.white,
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
                <Link href="/login" underline="hover" sx={{ fontWeight: 'bold' }}>
                  Log In
                </Link>
              </Typography>

              {/* Sign Up Box End */}
            </Box>
          </div>
        </motion.div>
      </header>
    </div>
  );
}

export default SignUp;
