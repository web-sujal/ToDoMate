import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#AF1B3F",
    },
    secondary: {
      main: "#fff",
      contrastText: "#121212",
    },
    background: {
      default: "#ECE4B7",
      paper: "#F6F3DF",
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
