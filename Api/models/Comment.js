var mongoose = require("mongoose");

var PostComment = new mongoose.Schema({
postId:{
    type: String,
    require: true,


},
comment:{
    type: String,
    max: 200,
    require: true

},
userId:{
    type: String,
    require: true
}

},
{timestamps: true}

);

module.exports = mongoose.model("Comment", CommentSchema)