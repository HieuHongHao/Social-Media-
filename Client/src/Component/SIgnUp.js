import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  Button,
  FormHelperText,
  Typography,
  Avatar,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { blue, red } from "@material-ui/core/colors";
import { useState } from "react";
import Api from "./Api";

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
    height: 700,
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
    marginTop: "50px",
  },
  password: {
    fontSize: "14px",
    marginTop: "40px",
  },
  userName: {
    fontSize: "14px",
    marginTop: "10%",
  },
  button: {
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
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
  avatar: {
    width: "100px",
    height: "100px",
  },
  icon: {
    fontSize: "60px",
  },
}));

export default function SignUp({ setUserAuth }) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [passConfirm, setPassConfirm] = useState();
  const [username, setUserName] = useState();
  const [passNotMatch, setPassNotMatch] = useState(false);
  const [error, setError] = useState();
  function handelSubmit(e) {
    e.preventDefault();
    if (password !== passConfirm) {
      setPassNotMatch(true);
    } else {
      Api.post("/users/signUp", {
        email,
        password,
        username,
      })
        .then((res) => {
          localStorage.setItem("jwt", `Bearer ${res.data.token}`);
          setUserAuth(true);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            setError(error.response.data);
          } else if (error.request) {
            console.log(console.log(error));
          }
        });
    }
  }
  return (
    <Paper elevation={24} className={classes.root}>
      <form onSubmit={handelSubmit}>
        <Avatar
          style={{
            margin: "auto",
          }}
          classes={{
            root: classes.avatar,
          }}
        >
          <AccountCircleIcon
            fontSize="large"
            classes={{
              fontSizeLarge: classes.icon,
            }}
          />
        </Avatar>
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          className={classes.userName}
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
          onChange={(e) => setUserName(e.target.value)}
        />
        {error && error.type === "repeat username" && (
          <FormHelperText>
            <Typography>{error.message}</Typography>
          </FormHelperText>
        )}
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
        {error && error.type === "repeat email" && (
          <FormHelperText>
            <Typography>{error.message}</Typography>
          </FormHelperText>
        )}
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
          onChange={(e) => setPassWord(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.password}
          label="Confirm Password"
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
          onChange={(e) => setPassConfirm(e.target.value)}
        />
        {passNotMatch && (
          <FormHelperText>
            <Typography>Password and Password Confirm do not match</Typography>
          </FormHelperText>
        )}
        <div className={classes.button}>
          <Button
            type="submit"
            variant="contained"
            classes={{
              root: classes.insideButton,
            }}
          >
            Create
          </Button>
        </div>
      </form>
    </Paper>
  );
}
