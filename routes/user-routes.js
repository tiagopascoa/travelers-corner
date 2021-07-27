const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//User Area
router.get("/user-area", async (req, res) => {
    try {
        const loggedUser = await User.findById(req.session.currentUser._id);
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

 //Followers
 router.post("/user-profile/:id/follower", async (req, res) => {
    try{
        const userDetail = await User.findById(req.params.id);

        await User.findByIdAndUpdate(req.session.currentUser._id, {
         $addToSet: { following: userDetail}
        });
        res.status(200).json(`id ${req.session.currentUser._id} was updated`);
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    }
    
});

module.exports = router;