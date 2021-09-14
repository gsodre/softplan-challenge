import React from "react";
import { AppBar, CssBaseline, ThemeProvider, Toolbar } from "@material-ui/core";

import Routes from "routes";
import theme from "styles/theme";
import logo from "shared/assets/logo.jpg";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar style={{ justifyContent: "center" }}>
          <img src={logo} alt="marvel-logo" style={{ height: "60px" }} />
        </Toolbar>
      </AppBar>
      <Routes />
      <CssBaseline />
    </ThemeProvider>
  );
};
