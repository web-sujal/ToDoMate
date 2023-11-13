import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#283618",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#ffe5ba",
      paper: "#fff3e0",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#212121",
    },
  },
});

/*

{
  "Dark moss green":"#606c38",
  "Pakistan green":"#283618",
  "Cornsilk":"#fefae0",
  "Earth yellow":"#dda15e",
  "Tiger’s Eye":"#bc6c25"
}

*/
