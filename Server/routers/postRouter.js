const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const commentRouter = require("./commentRouter");


router.use(authController.checkCredentials);
router.route("/")
      .get(postController.getPosts)
      .post(postController.createPost);

router.route("/:id")
      .get(postController.getPost)
      .patch(postController.editPost)
      .delete(postController.deletePost);
router.route("/react/:id").patch(postController.reactPost);
router.use("/:postid/comments", commentRouter);
module.exports = router;
