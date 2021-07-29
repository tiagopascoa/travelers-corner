const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//User Area
router.get("/user-area/:id", async (req, res) => {
    try {
        const loggedUser = await User.findById(req.params.id).populate("following");
        res.status(200).json(loggedUser); 
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    } 
 });

 //User Profile
 router.get("/user-profile/:userId", async (req, res) => {
    try {
        const userProfile = await User.findById(req.params.userId).populate("travelPosts");
        res.status(200).json(userProfile); 
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    } 
 });

 //Map
 router.get("/user-area/:id/map", async (req, res) => {
    try {
        const loggedUser = await User.findById(req.params.id).populate("following");
        res.status(200).json(loggedUser); 
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    } 
 });

 //Followers
 router.put("/user-profile/:id/follower/:loggedUserId", async (req, res) => {
    try{
        const userDetail = await User.findById(req.params.id);
        const myUser = req.session.currentUser;
        console.log(myUser);
        await User.findByIdAndUpdate(req.params.loggedUserId, {
         $addToSet: { following: userDetail}
        });
        res.status(200).json(`id ${req.params.loggedUserId} was updated`);
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    }
    
});

module.exports = router;