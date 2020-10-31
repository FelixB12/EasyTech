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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../common/Copyright";
import { useInput } from "../inputforms/CustomHookInputForm";
import axios from "axios";
import { API_URL } from "../constants/constants";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const [errFields, setErrFields] = useState({
    emailError: "",
    passwordError: "",
    firstnameError: "",
    lastnameError: "",
  });
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName,
  } = useInput("");
  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName,
  } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var validationErr = false;
    // Screen validation
    if (!email) {
      setErrFields({
        ...errFields,
        emailError: "Please Enter a valid E=mail Address",
      });
      validationErr = true;
    } else {
      setErrFields({ ...errFields, emailError: "" });
      validationErr = false;
    }
    if (!password) {
      setErrFields({ ...errFields, emailError: "Please Enter a Password" });
      validationErr = true;
    } else {
      setErrFields({ ...errFields, emailError: "" });
      validationErr = false;
    }
    if (!firstName) {
      setErrFields({
        ...errFields,
        emailError: "Please Enter your First Name",
      });
      validationErr = true;
    } else {
      setErrFields({ ...errFields, emailError: "" });
      validationErr = false;
    }
    if (!lastName) {
      setErrFields({
        ...errFields,
        emailError: "Please Enter a your Last Name",
      });
      validationErr = true;
    } else {
      setErrFields({ ...errFields, emailError: "" });
      validationErr = false;
    }

    // TODO Set Val

    if (!validationErr) {
      axios
        .post(API_URL + "users/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            // Rest fields if user was created successfully
            resetEmail();
            resetFirstName();
            resetLastName();
            resetPassword();
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {}, [errFields]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} validate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...bindFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  {...bindLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...bindEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...bindPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive Newsletters"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
