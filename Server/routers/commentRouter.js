const express = require("express");
const commentController = require("../controllers/commentController")
const router = express.Router({mergeParams:true});

router.route("/").get(commentController.getComments).post(commentController.createComment)



module.exports = router;