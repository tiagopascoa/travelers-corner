const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelPost = new Schema({
    title: {
        type: String,
        
    },
    location: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    tags: [String],
    imageUrl: {
        type: String,
        
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    comments: [{
        user: String,
        comment: String,
    }],
      
    
},
{timestamps: true}
);

const TravelPost = mongoose.model("Travel Post", travelPost);

module.exports = TravelPost;