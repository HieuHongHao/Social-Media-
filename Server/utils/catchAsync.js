module.exports = asyncFunc => {
    return (req,res,next) => {
        asyncFunc(req,res).catch((err) => {next(err);})
    }
}


