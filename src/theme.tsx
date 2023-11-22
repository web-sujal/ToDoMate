import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#AF1B3F",
    },
    secondary: {
      main: "#fff",
      contrastText: "rgba(0,0,0,0.8)",
    },
    background: {
      default: "#EAE1AE",
      paper: "#F2EDCF",
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
