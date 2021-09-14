import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#303134",
      dark: "#333",
      contrastText: "#CCC",
    },
    secondary: {
      main: "#303134",
      dark: "#333",
    },
    background: {
      default: "#202124",
    },
  },
  spacing: 8,
});

export default theme;
