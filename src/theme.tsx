import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#212121', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#fff3e0', 
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#263238', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#212121', 
    },
  },
});
