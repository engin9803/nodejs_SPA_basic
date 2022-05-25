const mongoose =  require("mongoose");
const postSchema = new mongoose.Schema({
    postId : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String
    },
    title : { 
        type : String
    },
    content : { 
        type : String
    },
    date : {
        type : String
    }
});

module.exports = mongoose.model("Post", postSchema);