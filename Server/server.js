const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});
const app = require("./app");

const moongoose = require('mongoose');
const port = 8000;

const DB = process.env.DATABASE.replace("<password>",process.env.PASSWORD);
moongoose.connect(DB,function(err, connection){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Connection established");
    }
})

app.listen(port,() => {
    console.log(`listening on port ${port}`);
})