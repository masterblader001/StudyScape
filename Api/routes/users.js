var User = require("../models/User");
var Router = require("express").Router();
var bcrypt = require("bcrypt");
const { request } = require("express");


//new user update
Router.put("/:id", async function(request, respond){
    if (request.body.userId === request.params.id || request.body.isAdmin){
        if (request.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                request.body.password = await bcrypt.hash(request.body.password, salt);
            } catch(err){
                return respond.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(request.params.id, {
                $set: request.body,
            });
            respond.status(200).json("Account has been updated");

        } catch (err) {
            return respond.status(500).json(err);
        } 
    } else{
        return respond.status(403).json("Administer Only");
    }
});

//delete user
Router.delete("/:id", async function(request, respond){
    if (request.body.userId === request.params.id || request.body.isAdmin){
     
        try{
            await User.findByIdAndDelete(request.params.id);
            respond.status(200).json("Account has been deleted");

        } catch (err) {
            return respond.status(500).json(err);
        } 
    } else{
        return respond.status(403).json("You can only delete your account");
    }
});

//Find a user
Router.get("/", async function(request, respond){
    const userId = request.query.userId;
    const username = request.query.username;
    try{
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({username: username});
        const {password, updateAt, ...other} = user._doc
        respond.status(200).json(other)

    }catch(err){
        respond.status(500).json(err);

    }
});

//get friends
Router.get("/friends/:userId", async(request,respond)=>{
    try {
        const user = await User.findById(request.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return User.findById(friendId)
            })
        );
        let friendList = [];
        friends.map((friend)=>{
            const { _id, username, profilePicture } = friend;
            friendList.push({_id, username, profilePicture});
        });
        respond.status(200).json(friendList)
    } catch (err) {
        respond.status(500).json(err);
    }
});

//follow method
Router.put("/:id/follow", async function(request,respond){
    if (request.body.userId !== request.params.id){
        try{
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);
            if(!user.followers.includes(request.body.userId)){
                await user.updateOne({$push:{followers: request.body.userId}});
                await currentUser.updateOne({$push:{followings: request.params.id}});
                respond.status(200).json("your are now following this account")
            }else{
                respond.status(403).json("you already follow this account")
            }
        } catch (err) {
            respond.status(500).json(err);

        }
    }
    else{
        respond.status(403).json("Invalid request: you can't follow yourself");
    }
})

//unfollow method
Router.put("/:id/unfollow", async function(request,respond){
    if (request.body.userId !== request.params.id){
        try{
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);
            if(user.followers.includes(request.body.userId)){
                await user.updateOne({$pull:{followers: request.body.userId}});
                await currentUser.updateOne({$pull:{followings: request.params.id}});
                respond.status(200).json("your have unfollow this account")
            }else{
                respond.status(403).json("you have not follow this account")
            }
        } catch (err) {
            respond.status(500).json(err);

        }
    }
    else{
        respond.status(403).json("Invalid request: you can't follow yourself");
    }
})



module.exports = Router;