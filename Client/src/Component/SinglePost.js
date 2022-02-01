import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Paper,
  Collapse,
  Button,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {blue} from "@material-ui/core/colors"
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import Comment from "./Comment";
import API from "./Api"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    marginTop: "100px",
    background:
      "radial-gradient(circle, rgba(6,103,144,1) 21%, rgba(174,45,181,1) 98%)",
    marginLeft: "auto",
    marginRight: "auto",
    opacity: "80%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
const PrettyButton = withStyles({
  root: {
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
  },
})(Button);
export default function SinglePost({ post,currentUser }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <Paper elevation={24}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              variant="circular"
              style={{ backgroundColor: `${post.author.color}` }}
            >
              {post.author.username.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <PrettyButton aria-label="settings">
              <MoreVertIcon />
            </PrettyButton>
          }
          title={post.title}
          subheader={new Date(post.createdAt).toLocaleString("en-US")}
        />
        <CardContent>
          <Typography variant="h5" style={{ color: "#141823" }} component="p">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <PrettyButton aria-label="add to favorites">
            <Typography>120</Typography>
            <FavoriteIcon />
          </PrettyButton>
          <PrettyButton aria-label="add to favorites">
            <Typography>11</Typography>
            <ThumbUpIcon />
          </PrettyButton>
          <PrettyButton onClick={() => setOpen(!open)}>
            <Typography>Comment</Typography>
          </PrettyButton>
        </CardActions>
        <Collapse in={open} timeout={500}>
          <Comment postComments={post.comments} currentUser={currentUser} postId = {post._id}/>
        </Collapse>
      </Card>
    </Paper>
  );
}
