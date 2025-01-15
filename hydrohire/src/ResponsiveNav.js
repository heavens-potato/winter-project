import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { motion } from 'framer-motion';
import ProfilePop from './ProfilePop';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useTheme } from '@mui/material/styles';

function ResponsiveNav({ onClose }) {
    const theme = useTheme();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openProfilePopup, setOpenProfilePopup] = useState(false);

    const openProfilePop = () => {
        setOpenProfilePopup(true);
    };

    const closeProfilePop = () => {
        setOpenProfilePopup(false);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <motion.div
            style={{ backgroundColor: theme.palette.primary.main}}
            className="h-screen w-3/5 z-50 absolute right-0"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '1rem', paddingTop: '6rem' }}>
                <HighlightOffIcon onClick={onClose} sx={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer' }} />
                <Button component={Link} to="/about" sx={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
                    About
                </Button>
                {/* <Button component={Link} to="/contact" sx={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
                    Contact
                </Button> */}
                {isLoggedIn ? (
                    <>
                        {/* My Profile Button */}
                        <Button
                            onClick={openProfilePop}
                            sx={{
                                color: 'black',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                border: '3px solid black',
                                borderRadius: '30px',
                                padding: '0.5rem 1.5rem',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                },
                            }}
                        >
                            My Profile
                        </Button>
                        {openProfilePopup && (
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    zIndex: 999999,
                                }}
                            >
                                <ProfilePop onClose={closeProfilePop} />
                            </div>
                        )}
                        {/* Dashboard Button */}
                        <Button
                            component={Link}
                            to="/dashboard"
                            sx={{
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                backgroundColor: 'black',
                                border: '3px solid black',
                                borderRadius: '30px',
                                padding: '0.5rem 1.5rem',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                },
                            }}
                        >
                            Dashboard
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Sign Up Button */}
                        <Button
                            component={Link}
                            to="/signup"
                            sx={{
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                backgroundColor: 'black',
                                border: '3px solid black',
                                borderRadius: '30px',
                                padding: '0.5rem 1.5rem',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                },
                            }}
                        >
                            Sign Up
                        </Button>

                        {/* Log In Button */}
                        <Button
                            component={Link}
                            to="/login"
                            sx={{
                                color: 'black',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                border: '3px solid black',
                                borderRadius: '30px',
                                padding: '0.5rem 1.5rem',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                },
                            }}
                        >
                            Log In
                        </Button>
                    </>
                )}
            </Box>
        </motion.div>
    )
}

export default ResponsiveNav;
