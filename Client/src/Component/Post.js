import { Container, makeStyles, Collapse, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { blue } from "@material-ui/core/colors";
import SinglePost from "./SinglePost";
import MakePost from "./MakePost";
import api from "./Api";
import Pagination from "@material-ui/lab/Pagination";
import { TransitionGroup } from "react-transition-group";


const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      boxShadow: "none",
      textTransform: "none",
      fontSize: 13,
      padding: "6px 12px",

      lineHeight: 1.5,
      backgroundColor: blue[600],
      borderColor: "#0063cc",
      color: "#fff",
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
  },
}));
export default function Post() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState();
  const classes = useStyles();
  useEffect(() => {
    async function createPost() {
      if (post) {
        try {
          const body = { content: post.postContent, title: post.postTitle };
          const res = await api.post("/posts", body, {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          });
          if (currentPage !== 1) {
            setCurrentPage(1); // user return to page 1 after making a new page
          } else {
            setPosts((prevPosts) => [res.data.post, ...prevPosts]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    createPost();
  }, [post]);

  useEffect(() => {
    // only fetch posts after user click on next page or others user make a post
    async function fetchPost() {
      const response = await api.get(`/posts/?page=${currentPage}&limit=10`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      });
      const { posts, numPosts, user } = response.data;
      return { posts, numPosts, user };
    }
    fetchPost().then((data) => {
      setPosts(data.posts);
      if (!totalPage) {
        // only set total page when fetching posts for the first time
        setTotalPage(data.numPosts);
      }
      if (!currentUser) {
        setCurrentUser(data.user);
      }
    });
  }, [currentPage]);
  return (
    <>
      <Container maxWidth="md">
        <MakePost setPost={setPost} user={currentUser} />
       <TransitionGroup>
          {posts?.map((post) => {
            return (
              <Collapse timeout={1000} key={post._id}>
                <SinglePost post={post} currentUser = {currentUser}/>
              </Collapse>
            );
          })}
        </TransitionGroup>

        <Pagination
          count={
            totalPage % 10 === 0
              ? totalPage / 10
              : Math.round(totalPage / 10) + 1
          }
          classes={{ ul: classes.ul }}
          size="large"
          style={{ marginTop: "30px" }}
          onChange={(e) => setCurrentPage(e.target.innerText)}
        />
      </Container>
    </>
  );
}
