const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config.env` });
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
const fs = require("fs");
const commentData = JSON.parse(
  fs.readFileSync(`${__dirname}/comment.json`, "utf-8")
);
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

function random(min, max) {
  return Math.random() * (max - min) + min;
}
async function inject() {
  return await Promise.all(
    commentData.map(async function (comment) {
      const user = await userModel.find().skip(random(1, 29)).limit(1);
      const post = await postModel.find().skip(random(1, 29)).limit(1);
      comment.author = user[0]._id;
      comment.post = post[0]._id;
      return await commentModel.create(comment);
    })
  );
}
mongoose.connect(DB).then(
  inject()
    .then((data) => console.log(data))
    .then(process.exit)
);
