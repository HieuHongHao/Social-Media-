const dotenv = require('dotenv');
dotenv.config({path : `${__dirname}/../config.env`}); // load config file into process.env
const mongoose = require("mongoose");
const Post = require("../models/postModel")
const User = require("../models/userModel")
const Comment = require("../models/commentModel")
const fs = require("fs");

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);



let Model;
let data;
switch(process.argv[3]){
    case "posts":
        Model = Post;
        data = JSON.parse(fs.readFileSync(`${__dirname}/post.json`,"utf-8"));
        break;
    case "users":
        Model = User;
        data = JSON.parse(fs.readFileSync(`${__dirname}/user.json`,"utf-8"));
        break;
    default:
        Model = Comment;
        data = JSON.parse(fs.readFileSync(`${__dirname}/comment.json`,"utf-8"));
}
const importData = async () => {
    try{
        console.log("Adding");
        let res;
        res = await Promise.all(data.map(doc => Model.create(doc)));
        console.log(res);
    } catch(err){
        console.log(err.message);
    }
}
const deleteData =  async () => {
    try{
        console.log("Deleting");
        let res = await Model.deleteMany();
        console.log(res);
    } catch(err){
        console.log(err.message);
    }
}

mongoose.connect(DB).then(async () => {
    console.log("DB connected");
    if(process.argv[2] === "--import"){
        await importData(Model);
       
    }
    else if(process.argv[2] === "--delete"){
        await deleteData(Model);
    }
    process.exit();
});





