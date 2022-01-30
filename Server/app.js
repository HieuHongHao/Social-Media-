const express  = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const globalErrorController = require("./controllers/errorControler");
const postRouter = require("./routers/postRouter");
const userRouter = require("./routers/userRouter");


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/v1/posts",postRouter);
app.use("/api/v1/users",userRouter);
app.use(globalErrorController);
module.exports = app;


