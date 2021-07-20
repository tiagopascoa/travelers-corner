const express = require("express");
const router = express.Router();
const TravelPost = require('../models/TravelPost.model');
const fileUpload = require("../config/cloudinary");


//Get all Travel Posts
router.get("/travel-posts", async (req, res) => {
    try {
        const allTravelPosts = await TravelPost.find();
        console.log(allTravelPosts)
        res.status(200).json(allTravelPosts); 
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    }  
}); 

//Create Travel Post 
router.post("/travel-posts/new", async (req, res) => {

    const {title, location, description, tags, imageUrl} = req.body;

    if (!title || !description || !location) {
        res.status(400).json({ message: "missing fields"});
        return;
    }

    try {
        const response = await TravelPost.create({
          title,
          location,
          description,
          tags,
          imageUrl
        });
        res.status(200).json(response);
      } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
      } 

});

//Upload image to cloudinary
router.post("/upload", fileUpload.single("image"), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Delete Travel Post
router.delete("/travel-posts/:id", async (req, res) => {
  try {
    await TravelPost.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: `id ${req.params.id} was deleted` });
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Get Travel Post by Id
router.get("/travel-posts/:id", async (req, res) => {
  try {
    const travelPost = await TravelPost.findById(req.params.id);
    res.status(200).json(travelPost)
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Update project 
router.put("/travel-posts/:id", async (req, res) => {
  try {
    const { title, description, location } = req.body;
    await TravelPost.findByIdAndUpdate(req.params.id, {
      title,
      description,
      location
    });
    res.status(200).json(`id ${req.params.id} was updated`);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

module.exports = router;