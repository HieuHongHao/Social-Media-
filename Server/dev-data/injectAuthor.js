const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({path : `${__dirname}/../config.env`});
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const fs = require("fs");
const postData = JSON.parse(fs.readFileSync(`${__dirname}/post.json`, "utf-8"));
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

function random(min, max) {
  return Math.random() * (max - min) + min;
}
async function inject() {
  return await Promise.all(
    postData.map(async function (post) {
      const user = await userModel.find()
            .skip(random(1,29))
            .limit(1);
       post.author = user[0]._id;
        return await postModel.create(post);
    })
  );
}
mongoose.connect(DB).then(inject().then(data => console.log(data)).then(process.exit));
