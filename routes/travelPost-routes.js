const express = require("express");
const router = express.Router();
const TravelPost = require('../models/TravelPost.model');
const User = require('../models/User.model');
const Like = require('../models/Like.model');
const fileUpload = require("../config/cloudinary");


//Get all Travel Posts
router.get("/main", async (req, res) => {
    try {
        const allTravelPosts = await TravelPost.find().populate("user");
        console.log(allTravelPosts)
        res.status(200).json(allTravelPosts); 
    } catch (e) {
        res.status(500).json({message: `erro occurred ${e}`});
    }  
});

//Get User Travel Post

router.get("/user/:id/travel-posts", async (req, res) => {
  try {
      const userPosts = await TravelPost.find({user: req.params.id})
      console.log(userPosts)
      res.status(200).json(userPosts); 
  } catch (e) {
      res.status(500).json({message: `erro occurred ${e}`});
  }  
});

//Create Travel Post 
router.post("/new-travel-post", async (req, res) => {

    const {location, description, tags, imageUrl, like, city, country} = req.body;

    if (!description || !city) {
        res.status(400).json({ message: "missing fields (title, description and location are required)"});
        return;
    }

    try {
        const response = await TravelPost.create({
          location,
          city,
          country,
          description,
          tags,
          imageUrl,
          like,
          user: req.session.currentUser
        });
        res.status(200).json(response);
      } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
      } 

});

//Create Comment
router.put("/travel-posts/:id/comments", async (req, res) => {
  
  try {
    const { comment, user } = req.body; 
    await TravelPost.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: {
        comment: comment,
        user: user,
        }
      },
    }, {new: true});
    res.status(200).json(`id ${req.params.id} was updated`);
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
    const travelPost = await TravelPost.findById(req.params.id).populate("user");
    res.status(200).json(travelPost)
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Update 
router.put("/travel-posts/:id", async (req, res) => {
  try {
    const { description, city, country } = req.body;
    await TravelPost.findByIdAndUpdate(req.params.id, {
      description,
      city,
      country
    });
    res.status(200).json(`id ${req.params.id} was updated`);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});




//Likes
router.post("/travel-post/:id/like", async (req, res) => {
  try {
    const user = await User.findById(req.session.currentUser._id);
    
    const travelPost = await TravelPost.findById(req.params.id);

/*      const existingLike = await Like.find({
      user:user,
      travelPost:travelPost,
    });  */

    /*  if(!existingLike){  */
      const like = await Like.create({user, travelPost});
    const updatedTravel = await TravelPost.findByIdAndUpdate(travelPost._id, {
      $push: {
        like: like
      }
    }, {new: true})
    res.status(200).json(updatedTravel.like.length);

/*       } else {
      res.status(500).json({ message: `you have already liked it` });
      // remove the like
    } 
 */
    
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

router.get("/travel-post/:id/like", async (req,res) => {
  try {
    const theTravelPost = await TravelPost.findById(req.params.id);
    const allLikes = await Like.find({ travelPost: theTravelPost})
    console.log(allLikes)
    res.status(200).json(allLikes); 
} catch (e) {
    res.status(500).json({message: `erro occurred ${e}`});
}  
})

module.exports = router;