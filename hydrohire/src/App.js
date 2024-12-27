import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Landing from './Landing';
import Login from './Login';
import SignUp from './SignUp';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB165', // Light Orange
      light: '#6FA9CD', // Light Blue
      dark: '#2A324B', // Dark Blue
      white: '#FFFFFF', // White
    },
    secondary: {
      main: '#DFB48A', // Light Brown
      light: '#D9EAF5', // Light Blue-gray
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Landing Home Page */}
          <Route path="/" element={<Landing />}></Route>

          {/* Login & Sign Up Routes */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
