import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";

//import Signout from "../users/Signout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textTransform: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {}, [user.token, user.loggedIn]);

  const Signout = (loggedIn, dispatch) => {
    //if (loggedIn) {
    dispatch({ type: "USER_LOGOUT" });
    history.push("/Home");
    //}
  };

  const ShowUserAction = (loggedIn, dispatch) => {
    if (!loggedIn) {
      return (
        <>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              history.push("/SignIn");
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              history.push("/SignUp");
            }}
          >
            Register
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Grid item>
            <Button
              color="inherit"
              className={classes.button}
              onClick={() => {
                Signout(user.loggedIn, dispatch);
              }}
            >
              Log out
            </Button>
          </Grid>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Easy Tech
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                history.push("/Home");
              }}
            >
              Home
            </Button>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                history.push("/Portfolio");
              }}
            >
              Portfolio
            </Button>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                history.push("/Blog");
              }}
            >
              Blog
            </Button>
          </Typography>
          {ShowUserAction(user.loggedIn, dispatch)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
