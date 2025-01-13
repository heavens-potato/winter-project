import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Typography, Button, Box, InputLabel, OutlinedInput, InputAdornment, FormControl, Select } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { signOut, verifyBeforeUpdateEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { motion } from 'framer-motion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getAuth, updateProfile, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { ThemeContext } from './App';
import CircleIcon from '@mui/icons-material/Circle';

function checkPasswordStrength(password) {
  const passwordRegex = new RegExp(/^(?=.*[@$!%*?&])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%?&]{8,}$/);
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailRegex.test(email);
}

function ProfilePop({ onClose }) {
  // Firebase getters
  const auth = getAuth();
  const db = getFirestore();

  const theme = useTheme();

  //import the theme context
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  //get currentUser
  const user = auth.currentUser;

  // States for updating email, display name, and password
  const [email, setEmail] = useState(user?.email || '');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // States for error message
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Navigate object
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleSave = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email');
      return;
    }

    try {
      if (!user) {
        setErrorMessage('Not logged in.');
        return;
      }

      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        console.log("Display name updated");

        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { displayName });
        console.log("Display name updated in Firestore");
        setSuccessMessage('Display name updated successfully.');
      }

      if (email !== user.email) {
        try {
          const continueUrl = `${window.location.origin}/ProfilePopUp`;
          setSuccessMessage('A verification email has been sent to your new email. Please verify to complete the update.');
          await verifyBeforeUpdateEmail(user, email);
          await signOut(auth);
          navigate('/login');
        } catch (error) {
          console.error("Error", error);
          setErrorMessage('Failed to update email. Please try again later.');
        }
        // try {
        //   const continueUrl = `${window.location.origin}/dashboard`;
        //   await sendEmailVerification(user, { url: continueUrl });
        //   setErrorMessage('A verification email has been sent to your email. Please verify before proceeding.');
        //   console.log("Verification email sent to update email.");

        //   await user.reload();
        //   if (user.emailVerified) {
        //     try {
        //       await updateEmail(user, email);
        //       console.log("Email updated successfully.");
        //       setSuccessMessage('Email updated successfully.');
        //     } catch (error) {
        //       console.error("Error updating email:", error);
        //       setErrorMessage('Failed to update email. Please try again later.');
        //     }
        //   } else {
        //     console.log("Email not yet verified.");
        //     setErrorMessage('Please verify your email before proceeding.');
        //   }
        // } catch (error) {
        //   console.error("Error sending verification email:", error);
        //   setErrorMessage('Failed to send verification email. Please try again later.');
        // }
      }
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setErrorMessage('Please login again to update your profile.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('The provided email address is invalid.');
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email address is already in use.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setErrorMessage('Please verify the new email before changing your current one.');
      } else {
        setErrorMessage('An error occurred while updating your profile.');
      }
      console.log("Error with email/display name update");
      console.error('Error with email/display name update:', error.message);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords must match.");
      return;
    }
    if (!checkPasswordStrength(newPassword)) {
      setErrorMessage('Password must have at least 1 lowercase letter, uppercase letter, number, and special character');
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      console.log("Reauthentication successful.");

      await updatePassword(user, newPassword);
      setSuccessMessage("Password updated successfully!");
      console.log("Password changed!");
    } catch (error) {
      console.error("Error updating password:", error.message);
      if (error.code === 'auth/wrong-password') {
        setErrorMessage("Incorrect current password.");
      } else {
        setErrorMessage("Failed to update password.");
      }
      console.log("Passwords failed to update");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out');
      if (window.location.pathname === '/dashboard') {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  }

  const colorPickerParentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.7,
        delayChildren: 0.8,
        staggerChildren: 0.05
      }
    }
  }

  const colorPickerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { scale: 1.1 }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center h-screen w-screen overflow-scroll"
    >
      <div className="flex flex-col items-center justify-center w-screen">
        <div className="flex flex-row justify-between items-center p-3 md:p-10 rounded-t-lg w-4/5 xl:w-3/5" style={{ borderRadius: '20px 20px 0 0', backgroundColor: theme.palette.primary.main }}>
          <h2 className="text-3xl font-bold">Hi, {user.displayName || "there"}</h2>
          <HighlightOffIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
        </div>
        <div className="flex flex-col md:flex-row space-evenly bg-white pl-5 md:pl-10 pr-5 md:pr-10 gap-5 rounded-b-lg w-4/5 xl:w-3/5" style={{ borderRadius: '0 0 20px 20px' }}>

          {/* Right half container */}
          <div className="flex flex-col mt-5 md:mt-10 w-full md:w-1/2 md: mb-5">

            <motion.div
              className="flex flex-row gap-5 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <SettingsIcon />
              <h3 className="text-3xl font-bold">Edit Profile</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h4 className="text-xl font-bold mt-4 mb-2" />
              <TextField label="Email" type="email" variant="outlined" fullWidth name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <h4 className="text-xl font-bold mt-4 mb-2" />
              <TextField label="Display Name" type="text" variant="outlined" fullWidth name="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              <Button
                onClick={handleSave}
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  fontSize: 20,
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: theme.palette.primary.white,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    color: (theme) => theme.palette.primary.white,
                  },
                  marginTop: 4,
                  marginBottom: 4,
                  borderRadius: 2,
                }}
              >
                SAVE
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Accordion elevation={0}
                sx={{
                  paddingBottom: { xs: 0, md: 4 }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                  aria-controls="panel-content"
                  id="panel-header"
                  sx={{
                    color: (theme) => theme.palette.primary.white,
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    borderRadius: 2,
                  }}
                >
                  <Typography>Change Password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    component="form"
                    onSubmit={handlePasswordChange}
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0, margin: '0 auto' }}
                  >

                    {/* Old Password Input */}
                    <h4 className="text-xl font-bold mt-4 mb-2" />
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                      <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        name="oldPassword"
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
                        label="Old Password"
                      />
                    </FormControl>


                    {/* New Password Input */}
                    <h4 className="text-xl font-bold mt-4 mb-2" />
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                      <OutlinedInput
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
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
                        label="New Password"
                      />
                    </FormControl>

                    {/* Confirm New Password Input */}
                    <h4 className="text-xl font-bold mt-4 mb-2" />
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm New Password</InputLabel>
                      <OutlinedInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmNewPassword"
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
                        label="Confirm New Password"
                      />
                    </FormControl>


                    {/* Update Button */}
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      sx={{
                        fontSize: 20,
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.white,
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.primary.dark,
                          color: (theme) => theme.palette.primary.white,

                        },
                        marginTop: 4,
                        marginBottom: 4,
                        borderRadius: 2,
                      }}
                    >
                      UPDATE PASSWORD
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </motion.div>

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
          </div>

          {/* Right half container */}
          <div className="flex flex-col justify-between w-full md:w-1/2 mb-10">
            {/* Palette controls */}
            <div className='flex flex-col h-full justify-between'>
              <div className="flex flex-col pb-0 md:pb-50 ml-0 md:ml-10">

                <motion.div
                  className="flex flex-row gap-5 mt-10 items-center pb-5 md:pb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <PaletteIcon />
                  <h3 className="text-3xl font-bold">Theme Color</h3>
                </motion.div>

                <motion.div
                  className="flex flex-row gap-2 md:gap-1 xl:gap-2 mt-0 pt-0 top-0 justify-start"
                  variants={colorPickerParentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('default')} sx={{ color: '#2A324B', cursor: 'pointer' }} />
                  </motion.div>

                  {/* vertical line to divide default colors from custom colors */}
                  <motion.div variants={colorPickerChildrenVariants} style={{ borderRight: '2px solid', borderColor: (theme) => theme.palette.primary.dark }} />

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('pink')} sx={{ color: '#FF99CC', cursor: 'pointer' }} />
                  </motion.div>

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('orange')} sx={{ color: '#FFB165', cursor: 'pointer' }} />
                  </motion.div>

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('saffron')} sx={{ color: '#F4C430', cursor: 'pointer' }} />
                  </motion.div>

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('pistachio')} sx={{ color: '#93C572', cursor: 'pointer' }} />
                  </motion.div>

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('green')} sx={{ color: '#50C878', cursor: 'pointer' }} />
                  </motion.div>

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('electricBlue')} sx={{ color: '#00C2CC', cursor: 'pointer' }} />
                  </motion.div>

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('lightBlue')} sx={{ color: '#6FA9CD', cursor: 'pointer' }} />
                  </motion.div>

                  <motion.div
                    variants={colorPickerChildrenVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CircleIcon onClick={() => setCurrentTheme('violet')} sx={{ color: '#CF9FFF', cursor: 'pointer' }} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Button container */}
              <motion.div
                className="w-full items-center flex justify-center md:justify-end pt-20 md:pt-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.4 }}
              >
                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: '#8B0000',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: '3px solid #8B0000',
                    borderRadius: '30px',
                    padding: '0.5rem 1.5rem',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                      border: '3px solid black'
                    },
                  }}
                >
                  Logout
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfilePop;