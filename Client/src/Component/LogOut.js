import { useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Navigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: blue[600],
    borderColor: "#0063cc",
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
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
    box: {
      marginTop: "10px",
    },
  },
}));
export default function Logout({ setUserAuth }) {
  const classes = useStyles();
  const [clearToken, setClearToken] = useState(false);
  if (clearToken) {
    localStorage.removeItem("jwt");
    setUserAuth(false);
  }
  return (
    <Box className={classes.box}>
      <Typography variant="h6" component="p" align="center" color="primary">
        Thank you for your time! Confirm logging out by pressing the button
        below
      </Typography>
      <Button
        className={classes.root}
        variant="contained"
        onClick={() => setClearToken(true)}
      >
        <Typography variant="h6">Confirm Logout</Typography>
      </Button>
    </Box>
  );
}
