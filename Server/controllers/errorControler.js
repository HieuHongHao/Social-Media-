module.exports = (err,req,res,next) => {
    console.log(err);
    if(err.code){
        if(err.code === 11000){
            let message;
            let type;
            if(err.keyValue.username){
                message = `username ${err.keyValue.username} already exists`;
                type = "repeat username";
            }
            if(err.keyValue.email){
                message = `email ${err.keyValue.email} already exists`;
                type = "repeat email";
            }
            return res.status(500).json({
                message,
                status : "Fail",
                type
            })
        }
    }
    err.status = err.status ? err.status : "fail";
    err.statusCode = err.statusCode ? err.statusCode : 500;
    res.status(err.statusCode).json({
            status: `${err.status}`,
            message: err.message,
            stack: err.stack
        })
    
}
