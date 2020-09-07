import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00A843",
    },
    secondary: {
      main: "#eee",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#bbb",
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
