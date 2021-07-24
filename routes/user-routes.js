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
        const userProfile = await User.findById(req.params.userId);
        res.status(200).json(userProfile); 
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    } 
 });


module.exports = router;