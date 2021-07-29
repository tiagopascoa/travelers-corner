const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", async (req, res) => {
    try {
        const allTravelPosts = await TravelPost.find().populate("user");
        console.log(allTravelPosts)
        res.status(200).json(allTravelPosts); 
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    }  
});