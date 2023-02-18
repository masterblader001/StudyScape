var Router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//userPosts

Router.post("/", async function(request,respond){
    const newPost = new Post(request.body);
    try{
        const SavePost = await newPost.save();
        respond.status(200).json(SavePost);

    }catch (err){
        respond.status(500).json(err);
    }
});

//editing Post
Router.put("/:id", async function(request,respond){
    try{
        const post = await Post.findById(request.params.id);
        if (post.userId === request.body.userId){
            await post.updateOne({$set:request.body});
            respond.status(200).json("The post had been edited")
         } else {
        respond.status(403).json("You can't edit the other post");
        }
    } catch(err) {
        respond.status(500).json(err)
    }
});

//deleting post
Router.delete("/:id", async function(request,respond){
    try{
        const post = await Post.findById(request.params.id);
        if (post.userId === request.body.userId){
            await post.deleteOne({$set:request.body});
            respond.status(200).json("The post had been deleted")
         } else {
        respond.status(403).json("You can't deleted the other post");
        }
    } catch(err) {
        respond.status(500).json(err);
    }
});

//like or dislike
Router.put("/:id/like", async function(request,respond){
    try {
        const post = await Post.findById(request.params.id);
        if(!post.likes.includes(request.body.userId)) {
            await post.updateOne({ $push: {likes: request.body.userId}});
            respond.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: request.body.userId }});
            respond.status(200).json("The post has been unliked");
        } 

    } catch (err) {
        respond.status(500).json(err);
    }
});

//getting post 
Router.get("/:id", async function(request,respond){
    try{ 
        const post = await Post.findById(request.params.id);
        respond.status(200).json(post);

    }catch(err){
        respond.status(500).json(err);
    }

});

//feed post
Router.get("/timeline/:userId", async function(request, respond){
    try{
        const currentUser = await User.findById(request.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Post.find( { userId: friendId} );
            })
        );
        respond.status(200).json(userPosts.concat(...friendPosts));
    } catch(err){
        respond.status(500).json(err);
    }
});

//get user's all posts
Router.get("/profile/:username", async function(request, respond){
    try{
        const user = await User.findOne({ username: request.params.username});
        const posts = await Post.find({ userId: user._id });
        respond.status(200).json(posts)
        
    } catch(err){
        respond.status(500).json(err);
    }
});

module.exports = Router;