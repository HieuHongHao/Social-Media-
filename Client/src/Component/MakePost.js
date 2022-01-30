import { useState} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  Button,
  
} from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";
import { cyan } from "@material-ui/core/colors";
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
export default function MakePost({setPost,user}) {
  const classes = useStyles();
  const [postContent, setPostContent] = useState();
  const [postTitle,setPostTitle] = useState();
  function handelSubmit(e) {
    e.preventDefault();
    if (postContent) {
      setPost({postContent,postTitle});
    }
  }
  console.log(user);
 return (
    <>
      <form onSubmit={handelSubmit}>
        <Card
          style={{
            backgroundColor: cyan[200],
            Height: "10px",
            marginTop: "100px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                variant="circular"
                style={{ backgroundColor: `${user?.color}` }}
                className={classes.large}
              >
                {user?.username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <TextField
                id="filled-textarea"
                label=""
                placeholder="Enter your title here"
                multiline
                fullWidth={true}
                variant="filled"
                onChange={(e) => setPostTitle(e.target.value)}
              />
            }
            />
          <CardContent>
            <TextField
              id="filled-textarea"
              label=""
              placeholder="Enter your post here"
              multiline
              fullWidth={true}
              variant="filled"
              onChange={(e) => setPostContent(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Post
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
