import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Button,
  Collapse,
} from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import Api from "./Api";
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
export default function Comment({ postComments, currentUser, postId }) {
  const [comments, setComments] = useState(postComments);
  const [content, setContent] = useState("");
  const classes = useStyles();
  function handelContents(e) {
    setContent(e.target.value);
  }
  function handelSubmit(e) {
    e.preventDefault();
    if (content) {
      const body = { content };
      Api.post(`/posts/${postId}/comments`, body, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
        .then((res) => {
          if (!comments) {
            setComments(comments);
          } else {
            setComments((prevComment) => [...prevComment,res.data.comment]);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(console.log(error));
          }
        });
    }
  }
  return (
    <>
      <Card style={{ backgroundColor: cyan[200], Height: "10px" }}>
        <CardHeader
          avatar={
            <Avatar
              variant="circular"
              style={{ backgroundColor: `${currentUser?.color}` }}
              className={classes.large}
            >
              {currentUser?.username.charAt(0).toUpperCase()}
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
            <Button type="submit" variant="contained" color="primary">
              Comment
            </Button>
          </form>
        </CardContent>
        <Divider />
      </Card>
      <TransitionGroup>
        {comments?.map((comment) => (
          <Collapse key={comment._id} timeout={500}>
            <Card style={{ backgroundColor: cyan[200], Height: "10px" }}>
              <CardHeader
                avatar={
                  <Avatar
                    variant="circular"
                    style={{ backgroundColor: `${comment.author[0].color}` }}
                    className={classes.large}
                  >
                    {comment?.author[0].username.charAt(0).toUpperCase()}
                  </Avatar>
                }
              />
              <CardContent>
                <Typography variant="h6" component="p" color="textSecondary">
                  {comment.content}
                </Typography>
              </CardContent>
            </Card>
            <Divider />
          </Collapse>
        ))}
      </TransitionGroup>
    </>
  );
}
