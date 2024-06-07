import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    blue: Palette["primary"];
    white: Palette["primary"];
    yellow: Palette["primary"];
    red: Palette["secondary"];
  }
  interface PaletteOptions {
    blue: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
    yellow: PaletteOptions["primary"];
    red: PaletteOptions["secondary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC",
    },
    secondary: {
      main: "#CFFAFA",
    },
    blue: {
      main: "#335C6E",
    },
    yellow: {
      main: "#FABD33",
    },
    white: {
      main: "#FFFFFF",
    },
    red: {
      main: "#F76434",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#2C3232",
    },
  },
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
});

export default function ResponsiveTheme() {
  return responsiveFontSizes(theme);
}
