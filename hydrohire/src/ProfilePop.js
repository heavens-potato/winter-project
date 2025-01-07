import React, { useState } from 'react';
import { TextField, IconButton, Typography, Button, Box, InputLabel, OutlinedInput, InputAdornment, FormControl } from '@mui/material';
// import PaletteIcon from '@mui/icons-material/Palette';
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

function checkPasswordStrength(password) {
  const passwordRegex = new RegExp(/^(?=.*[@$!%*?&])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%?&]{8,}$/);
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailRegex.test(email);
}

function ProfilePop({ onClose }) {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const [email, setEmail] = useState(user?.email || '');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      let message = '';
      if (!user) {
        setErrorMessage('Not logged in.');
        return;
      }
      if (email !== user.email) {
        try {
          await sendEmailVerification(user); 
          setErrorMessage('A verification email has been sent to your email. Please verfiy before proceeding.');
          message += `Email updated successfully to ${email}. `;
          console.log("Verification email sent to update email.");
        } catch (error) {
            console.error("Error sending verification email:", error);
            setErrorMessage('Failed to send verification email. Please try again later.');
            return; 
        }
        return; 
      }
      await user.reload();
      if (user.emailVerified) {
        try {
          await updateEmail(user, email);
          console.log("Email updated successfully.");
          message += `Email updated successfully to ${email} `;
        } catch (error) {
          console.error("Error updating email:", error);
          setErrorMessage('Failed to update email. Please try again later.');
          return;
        }
      } else {
        console.log("Email not yet verified.");
        setErrorMessage('Please verify your email before proceeding.');
        return;
      }
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        console.log("Display name updated");
        
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { displayName });
        message += 'Display name updated successfully.';
        console.log("Display name updated in Firestore");
      }
      setSuccessMessage(message || 'No changes made.');
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-screen w-screen overflow-scroll"
    >
      <div className="flex flex-col items-center justify-center w-screen">
        <div className="flex flex-row justify-between items-center bg-[#FFB165] p-10 rounded-t-lg w-4/5 lg:w-3/5" style={{ borderRadius: '20px 20px 0 0' }}>
          <h1 className="text-4xl font-bold">My Profile</h1>
          <HighlightOffIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
        </div>
        <div className="flex flex-col md:flex-row justify-between bg-white pl-5 md:pl-10 pr-5 md:pr-10 rounded-b-lg w-4/5 lg:w-3/5" style={{ borderRadius: '0 0 20px 20px' }}>
          <div className="flex flex-col mt-10 w-full md:w-1/2">
            <div className="flex flex-row gap-5 items-center">
              <SettingsIcon />
              <h3 className="text-3xl font-bold">Edit Profile</h3>
            </div>
            <h4 className="text-xl font-bold mt-4 mb-2">Email</h4>
            <TextField label="Email" type="email" variant="outlined" fullWidth name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h4 className="text-xl font-bold mt-4 mb-2">Display Name</h4>
            <TextField label="Display Name" type="text" variant="outlined" fullWidth name="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <Button
              onClick={handleSave}
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                fontSize: 20,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: 'white',
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
            <Accordion elevation={0}
              sx={{
                paddingBottom: 4,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel-content"
                id="panel-header"
                sx={{
                  color: 'white',
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
                  <h4 className="text-xl font-bold mt-4 mb-2">Old Password</h4>
                  <FormControl variant="outlined" fullWidth >
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
                  <h4 className="text-xl font-bold mt-4 mb-2">New Password</h4>
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
                  <h4 className="text-xl font-bold mt-4 mb-2">Confirm New Password</h4>
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
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* <div>
                <div className="flex flex-row gap-5 mt-10 items-center w-full">
                  <PaletteIcon />
                  <h3 className="text-3xl font-bold">Theme Color</h3>
                </div>
              </div> */}
        </div>
      </div>
    </motion.div>
  )
}

export default ProfilePop;