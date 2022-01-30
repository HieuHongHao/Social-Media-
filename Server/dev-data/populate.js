const casual = require("casual");
const fs = require("fs");
casual.define('user',function(type){
    return{
        username: casual.username,
        DateofBirth: casual.date(format = 'YYYY-MM-DD'),
        type: type || "private",
        email: casual.email,
    }
})
casual.define('posts',function(type){
    return{
        likes: casual.likes(0,1000),
        contents: casual.text(format)
    }
})