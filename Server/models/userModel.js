const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Post = require("./postModel");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        require: [true,"An user must have a name"],
        minlength: 2,
        unique : [true,"User name already exists"]
    },
    email: {
        type : String,
        require: [true,"An user must have an email address"],
        validate:{
            validator: function(val){
                return validator.isEmail(val);
            },
            message: "email not valid"
        },
        unique : [true,"Email already exists"]
    },
    password:{
        type: String,
        require: [true,"An user must have a password"],
        minlength:6,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now 
    },
    active:{
        type: Boolean,
        default: true
    },
    passwordResetToken: String,
    paswordResetExpires: Date,
    color: String,
    passwordChangeAt: Date
})
userSchema.virtual("posts",{
    ref: Post,
    foreignField: "author",
    localField: "_id"
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,12);
    next();   
})
userSchema.pre(/^find/,function(next){
    this.find({active: true});
    next();
})
userSchema.methods.comparePassWord = function(target){
    return bcrypt.compare(target,this.password);
}
const userModel = mongoose.model('User',userSchema);

module.exports = userModel;



