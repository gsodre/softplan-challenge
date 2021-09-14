import React from "react";
import { AppBar, CssBaseline, ThemeProvider, Toolbar } from "@material-ui/core";

import Routes from "routes";
import theme from "styles/theme";
import logo from "shared/assets/logo.jpg";
import { Apollo as ApolloProvider } from "shared/apollo";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider>
        <AppBar position="sticky">
          <Toolbar style={{ justifyContent: "center" }}>
            <img src={logo} alt="marvel-logo" style={{ height: "60px" }} />
          </Toolbar>
        </AppBar>
        <Routes />
        <CssBaseline />
      </ApolloProvider>
    </ThemeProvider>
  );
};
