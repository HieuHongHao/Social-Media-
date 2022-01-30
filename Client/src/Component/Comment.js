import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Button
} from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function Comment() {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const classes = useStyles();
  function handelContents(e) {
    setContent(e.target.value);
  }
  function handelSubmit(e){
      e.preventDefault();
      if(content) setComments((prevComment) => [...prevComment,content]);
  }
  return (
    <>
      <Card style={{ backgroundColor: cyan[200], Height: "10px" }}>
        <CardHeader
          avatar={
            <Avatar
              variant="circular"
              style={{ backgroundColor: "green" }}
              className={classes.large}
            >
              Mem
            </Avatar>
          }
        />
        <CardContent>
          <form onSubmit={handelSubmit}>
            <TextField
              id="filled-textarea"
              label=""
              placeholder="Enter your text here"
              multiline
              fullWidth={true}
              variant="filled"
              onChange={(e) => handelContents(e)}
            />
            <Button type="submit" variant="contained" color = "primary">Comment</Button>
          </form>
        </CardContent>
            <Divider/>
      </Card>
     {comments.map((comment, index) => (
        <>
          <Card style={{ backgroundColor: cyan[200], Height: "10px" }}>
            <CardHeader
              avatar={
                <Avatar
                  variant="circular"
                  style={{ backgroundColor: "black" }}
                  className={classes.large}
                >
                  S
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h6" component="p" color="textSecondary">
                {comment}
              </Typography>
            </CardContent>
          </Card>
          <Divider />
        </>
      ))}
    </>
  );
}
