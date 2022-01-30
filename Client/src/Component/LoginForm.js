import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import api from "./Api";
import SignUp from "./SIgnUp";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(0deg, rgba(198,35,184,1) 10%, rgba(29,57,199,1) 92%)",
    height: 500,
    width: 500,
    borderRadius: "12px",
  },
  labels: {
    fontWeight: 300,
    fontSize: "23px",
  },
  focused: {
    borderColor: red[300],
    borderRadius: "8px",
    boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
    background:
      "linear-gradient(90deg, rgba(252,70,107,1) 17%, rgba(63,94,251,1) 93%)",
  },
  focusedLabel: {
    fontSize: "18px",
    color: `${blue[300]} !important`,
  },
  email: {
    fontSize: "14px",
    marginTop: "100px",
  },
  password: {
    fontSize: "14px",
    marginTop: "40px",
  },
  button: {
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  },
  sigup: {
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notchedOutline: {
    borderColor: "rgba(206,212,218, .993)",
    borderRadius: "8px",
    boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
  },
  insideButton: {
    width: "120px",
    height: "50px",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    background: blue[600],
    borderColor: "rgba(206,212,218, .993)",
    borderRadius: 8,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(252,70,107,1) 17%, rgba(63,94,251,1) 93%)",
      borderColor: "rgba(206,212,218, .993)",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "rgba(206,212,218, .993)",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
}));
function Login({setUserAuth}) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signUp, setSignUp] = useState();
  async function handelSubmit(e) {
    try {
      e.preventDefault();
      const response = await api.post("/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("jwt",`Bearer ${token}`);
      setUserAuth(true);
    } catch (err) {
      console.log(err);
    }
  }
  if(signUp){
    return (<SignUp setUserAuth={setUserAuth}/>)
  }
  return (
     <Paper elevation={24} className={classes.root}>
      <form onSubmit={handelSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          className={classes.email}
          label="Email"
          InputLabelProps={{
            classes: {
              root: classes.labels,
              focused: classes.focusedLabel,
            },
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
              focused: classes.focused,
            },
          }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          variant="outlined"
          className={classes.password}
          label="Password"
          InputLabelProps={{
            classes: {
              root: classes.labels,
              focused: classes.focusedLabel,
            },
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
              focused: classes.focused,
            },
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.button}>
          <Button
            type="submit"
            variant="contained"
            classes={{
              root: classes.insideButton,
            }}
          >
            Login
          </Button>
        </div>
        <div className={classes.sigup}>
          <FormHelperText>
            <Typography>Don't have an account ? </Typography>
          </FormHelperText>
        </div>
        <div className={classes.sigup}>
          <Button
            type="submit"
            variant="contained"
            classes={{
              root: classes.insideButton,
            }}
            onClick={()=>setSignUp(true)}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default Login;
