import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import theme from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <AuthProvider>
    <DataProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </DataProvider>
  </AuthProvider>,
  document.querySelector("#root")
);
