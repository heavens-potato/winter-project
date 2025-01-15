import React, { useState } from 'react';
import { TextField, Button, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import capybaraLogo from './assets/img/Capybara.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const theme = useTheme();

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email, {
                url: 'http://localhost:3000/login', // CLAIRE CHANGE THIS ONCE WITH ACTUAL LINK
                handleCodeInApp: false,
            });
            setMessage('Password reset email sent. Please check your inbox.');
        } catch (error) {
            setMessage('Failed to send password reset email. Please try again.');
            console.error('Error:', error);
        }
    };

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
                            <div className="flex flex-col justify-center flex-1">
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    Forgot Password?
                                </Typography>
                                <Typography variant="body2">
                                    Enter your email to reset your password
                                </Typography>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    src={capybaraLogo}
                                    className="h-[4rem] md:h-[5rem] object-contain"
                                    alt="Capybara Logo"
                                />
                            </div>
                        </div>

                        <Box
                            component="form"
                            onSubmit={handlePasswordReset}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '350px', margin: '0 auto' }}
                        >
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
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
                                Send Reset Email
                            </Button>
                            {message && (
                                <Typography color="primary" align="center">
                                    {message}
                                </Typography>
                            )}
                        </Box>
                    </div>
                </motion.div>
            </header>
        </div>
    );
};

export default ForgotPassword;
