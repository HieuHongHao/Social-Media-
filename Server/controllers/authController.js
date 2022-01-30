const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")


function signToken(res,user){
    const token = jwt.sign({id:user._id},process.env.SECRET,{expiresIn: process.env.EXPIRES});
    res.status(200).json({
        status : "success",
        token
    })
}

const signUp = catchAsync(async(req,res) => {
    const {username,password,email} = req.body;
    if(!username){throw new AppError("Needs user name",404);}
    if(!password){throw new AppError("Needs password",404);}
    if(!email){throw new AppError("Needs email",404);}
    
    const newUser = await userModel.create(req.body);
    const token = jwt.sign({id:newUser._id},process.env.SECRET,{expiresIn: process.env.EXPIRES});
    signToken(res,newUser);
})
const logIn = catchAsync(async(req,res) => {
    const {password,email} = req.body;
    if(!password) {throw new AppError("Needs password",404);}
    if(!email) {throw new AppError("Needs email",404);}
    const user = await userModel.findOne({email}).select("+password");
    if(!user){ throw new AppError("No users with this email address found",404);}
    if(!await user.comparePassWord(password)){
        throw new AppError("Wrong password and email combination",404);
    }
    signToken(res,user);
})

const checkCredentials = async (req,res,next) => {
    const tokenString = req.headers.authorization;
    
    if(!tokenString){
        return next(new AppError("Please log in ",404));
    }
    console.log(tokenString);
    if(tokenString.split(" ")[1] === "null"){
        console.log("This run");
        return next(new AppError("Invalid token",403));
    }
    const token = tokenString.split(" ")[1];
    const credential = jwt.verify(token,process.env.SECRET)
    if(!credential){
        next(new AppError("User doesnt have valide credentail",404));
    }
    const user = await userModel.findById(credential.id); // will not find user if user account is not active
    if(!user){
        next(new AppError("Current user account doesnt exist",404));
    }
    req.user = user;
    next();
}



const updatePassword = catchAsync(async (req,res) => {
    const {newPassWord} = req.body;
    if(!newPassWord){
        throw new AppError("New password cannot be empty",404);
    }
    if(!req.user.id){
        throw new AppError("User not authorized to change password",404);
    }
    const user = await userModel.findByIdAndUpdate(req.user.id,{password:newPassWord},{new:true});
    res.status(200).json({
        status: "Sucess",
        user
    })
})




module.exports = {
    signUp,
    logIn,
    checkCredentials,
    updatePassword,
}
