import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './output.css';
import './input.css';
import Landing from './Landing';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import About from './About'
import ForgotPassword from './ForgotPassword';

function App() {
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
        dark: '#331A00', // Dark Orange
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#FFF2E6', // Light Orange-gray

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
        dark: '#0D1C26', // Dark Blue
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#ECF4F8', // Light Blue-gray
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
        dark: '#1A0033', // Dark Violet
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#F2E6FF', // Light Violet-gray
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
        main: '#FF99CC', // Light pink
        light: '#FF99CC', // Light pink
        dark: '#33001A', // Dark pink
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#FFE6F2', // Light Pink-white
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
        dark: '#0C2715', // Dark green
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#ECF9F0', // Whiteish Green
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
        dark: '#302503', // Dark saffron
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#FEF8E7', // Whiteish Saffron
      },
      background: {
        default: '#FFFFFF', // White
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  const themeElectricBlue = createTheme({
    palette: {
      primary: {
        main: '#00C2CC', // Electric Blue
        light: '#00C2CC', // Electric Blue
        dark: '#003033', // Dark electric blue
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#E6FEFF', // Whiteish electric blue
      },
      background: {
        default: '#FFFFFF', // White
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  const themePistachio = createTheme({
    palette: {
      primary: {
        main: '#93C572', // Pistachio
        light: '#93C572', // Pistachio
        dark: '#233616', // Dark pistachio
        white: '#FFFFFF', // White
      },
      secondary: {
        main: '#DFB48A', // Light Brown
        light: '#F1F8ED', // Whiteish pistachio
      },
      background: {
        default: '#FFFFFF', // White
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  const themes = {
    default: themeDefault,
    orange: themeOrange,
    lightBlue: themeLightBlue,
    violet: themeViolet,
    pink: themePink,
    green: themeGreen,
    saffron: themeSaffron,
    electricBlue: themeElectricBlue,
    pistachio: themePistachio,
  }

  // State variable to keep track of the current theme
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Use the theme saved in local storage or default if there is none
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'default';
  });

  // useEffect that adds the current theme into local storage
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // High contrast theme state variable
  const [highContrast, setHighContrast] = useState(() => {
    const savedHighContrast = localStorage.getItem('highContrast');
    return savedHighContrast === 'true'; 
  });

  return (

    <ThemeProvider theme={themes[currentTheme]}>
      <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
        <highContrastContext.Provider value={{ highContrast, setHighContrast }}>
          <Router>
            <AppContent />
          </Router>
        </highContrastContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        {/* Landing Home Page */}
        <Route path="/" element={<Landing />}></Route>

        {/* Login & Sign Up Routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}></Route>

        {/* About Page */}
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default App;

// Export the theme context
export const ThemeContext = createContext();
export const highContrastContext = createContext();