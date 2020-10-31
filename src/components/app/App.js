import React from "react";
import "./App.css";
import Navigation from "../header/Navigation";
import Homepage from "../homepage/Homepage";
import SignUp from "../users/Signup";
import SignIn from "../users/Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { grey, green } from "@material-ui/core/colors";
import Copyright from "../common/Copyright";
function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          //type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: grey[800],
          },
          default: {
            main: green[600],
          },
        },
      }),
    [prefersDarkMode]
  );

  // Check if user is logged in

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/Home" component={Homepage} />
            {/* <Route path="/Portfolio" component={Portfolio} /> */}
            <Route path="/SignUp" component={SignUp} />
            <Route path="/SignIn" component={SignIn} />
          </Switch>
        </Router>
        <Copyright />
      </ThemeProvider>
    </div>
  );
}

export default App;
