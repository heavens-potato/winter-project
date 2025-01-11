import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './output.css';
import './input.css';
import Landing from './Landing';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

const themeDefault = createTheme({
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

const themeOrange = createTheme({
  palette: {
    primary: {
      main: '#FFB165', // Light Orange
      light: '#FFB165', // Light Orange
      dark: '#663300', // Dark Orange
      white: '#FFFFFF', // White
    },
    secondary: {
      main: '#DFB48A', // Light Brown
      light: '#FFD9B3', // Light Orange-gray

    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const themeLightBlue = createTheme({
  palette: {
    primary: {
      main: '#6FA9CD', // Light Blue
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

const themeViolet = createTheme({
  palette: {
    primary: {
      main: '#CF9FFF', // Light violet
      light: '#CF9FFF', // Light violet
      dark: '#330066', // Dark Violet
      white: '#FFFFFF', // White
    },
    secondary: {
      main: '#DFB48A', // Light Brown
      light: '#E6CCFF', // Light Blue-gray
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const themePink = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // Light pink
      light: '#FF69B4', // Light pink
      dark: '#660033', // Dark pink
      white: '#FFFFFF', // White
    },
    secondary: {
      main: '#DFB48A', // Light Brown
      light: '#FFCCE6', // Light Pink-white
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const themeGreen = createTheme({
  palette: {
    primary: {
      main: '#50C878', // Green
      light: '#50C878', // Green
      dark: '#184E2A', // Dark green
      white: '#FFFFFF', // White
    },
    secondary: {
      main: '#DFB48A', // Light Brown
      light: '#D8F3E1', // Whiteish Green
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const themeSaffron = createTheme({
  palette: {
    primary: {
      main: '#F4C430', // Saffron
      light: '#F4C430', // Saffron
      dark: '#614A05', // Dark saffron
      white: '#FFFFFF', // White
    },
    secondary: {
      main: '#DFB48A', // Light Brown
      light: '#FCF1CF', // Whiteish Saffron
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const themeRed = createTheme({
  palette: {
    primary: {
      main: '#DE3163', // Red
      light: '#DE3163', // Red
      dark: '#614A05', // Dark saffron
      white: '#FFFFFF', // White
    },
    secondary: {
      main: '#DFB48A', // Light Brown
      light: '#FCF1CF', // Whiteish Saffron
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
  const [theme, setTheme] = useState(themeDefault); 

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Landing Home Page */}
        <Route path="/" element={<Landing />}></Route>

        {/* Login & Sign Up Routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
