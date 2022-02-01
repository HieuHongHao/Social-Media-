const catchAsync =  require("../utils/catchAsync");
const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");
const AppError = require("../utils/appError");

async function findPost(id){
    if(!id){
        throw new AppError("Cannot find post",404);
    }
    const post = await postModel.findById(id).populate("comments");
    if(!post){
        throw new AppError("This post does not exist",404);
    }
    return post;
}

const getComments = catchAsync(async(req,res) => {
    const post = await findPost(req.params.postid);
    const comments = post.comments;
    res.status(202).json({
        status: "Success",
        results: comments ? comments.length : 0,
        data: comments
    })
})

const createComment =  catchAsync(async(req,res) => {
    await findPost(req.params.postid);
    const {content} = req.body;
    if(!content){
        throw new AppError("comment can not be empty",404);
    }
    const comment = await commentModel.create({content,post:req.params.postid,author:req.user._id});
    await comment.populate("author");
    res.status(202).json({
        status: "Success",
        comment
    })
})


module.exports = {
    getComments,
    createComment
}
