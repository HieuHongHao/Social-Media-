const catchAsync = require("../utils/catchAsync");
const postModel = require("../models/postModel");
const APIFeatures = require("../utils/apiFeature");
const AppError = require("../utils/appError");


async function findPost(id,userRequired,userId){
    const post = await postModel.findById(id);
    if(!post){throw new AppError("No posts with given id found",404)};
    // check if user is allowed to edit this post 
    if(userRequired && !post.author.equals(userId)) {
        throw new AppError("User doesnt have authority to edit this post",404);
    }
    return post;
}
const getPosts = catchAsync(async(req,res) => {
    let api = new APIFeatures(req.query,postModel.find());
    const numPosts = await postModel.countDocuments();
    api = api.filter().sort().limitFields().paginate();
    const posts = await api.queryBuild.populate("comments").populate("author");
    res.status(202).json({
        status : "sucess",
        results: posts.length,
        posts,
        numPosts,
        user: req.user
    })
})
const getPost = catchAsync(async(req,res) => {
    //const post = await findPost(req.params.id,false,req.user._id);
    const post = await postModel.findById(req.params.id);   
    res.status(202).json({
        status: "sucess",
        post,
    })
})

const createPost = catchAsync(async(req,res) => {
    const {content} = req.body;
    const title = req.body.title ? req.body.title : "";
    const author = req.user._id;
    if(!content){
        throw new AppError("Post can not be empty",404);
    }
    const post = await postModel.create({author,content,title});
    await post.populate("author");
    res.status(202).json({
        status: "Success",
        post,
        
    })  
})

const editPost = catchAsync(async(req,res) => {
    const {content} = req.body;
    if(!content){throw new AppError("Post can not be empty",404)};
    const post = await findPost(req.params.id,true,req.user._id);
    post.content = content;
    await post.save() // run validators again 
    res.status(202).json({
        status: "Success",
        data : post
    })
})

const deletePost = catchAsync(async(req,res) => {
    // check if post exists and if user is allowed to edit post 
    const post = await findPost(req.params.id,true,req.user._id);
    // set post to inactive
    post.active = false;
    await post.save() // run validators again
    res.status(202).json({
        status: "Success",
        message: "Post deleted"
    })
})
const reactPost = catchAsync(async(req,res) => {
    const post = await findPost(req.params.id,false,req.user._id);
    const {like} = req.body;
    post.likeNumbers += like;
    await post.save(); // run validators again 
    res.status(202).json({
        status: "Sucess",
        data: post.likeNumbers
    })
})
module.exports = {
    getPosts,
    createPost,
    editPost,
    getPost,
    deletePost,
    reactPost
}