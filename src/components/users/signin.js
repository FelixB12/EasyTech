import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useInput } from "./../inputforms/customHookInputForm";
import { API_URL, USER_AUTH } from "./../constants/constants";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../actions/userActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const displayError = (errMsg) => {
  return (
    <div>
      <Alert severity="error">{errMsg}</Alert>
    </div>
  );
};

const displaySuccess = (successMsg) => {
  return (
    <div>
      <Alert severity="success">{successMsg}</Alert>
    </div>
  );
};

export default function SignIn() {
  const [resErrMessage, setErrMessage] = useState("");
  const [resSuccessMessage, setSuccessMessage] = useState("");
  const classes = useStyles();
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const dispatch = useDispatch();
  useEffect(() => {}, [resErrMessage, resSuccessMessage]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(email);
    if (email && password) {
      console.log("sending request");
      axios
        .post(API_URL + USER_AUTH, { email: email, password: password })
        .then((res) => {
          if (res.data.token) {
            setSuccessMessage(res.data.info.message);
            setErrMessage("");

            // TODO handle loggedin state differently maybe
            dispatch(authenticateUser(res.data.user, res.data.token, true));
          } else {
            setSuccessMessage("");
            setErrMessage(res.data.info.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          {resErrMessage.length > 0 ? displayError(resErrMessage) : ""}
          {resSuccessMessage.length > 0
            ? displaySuccess(resSuccessMessage)
            : ""}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...bindEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...bindPassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
