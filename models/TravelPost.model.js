const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelPost = new Schema({
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
    like: {
        type: Schema.Types.ObjectId,
        ref: "Like"
    },
    comments: [{
        user: String,
        comment: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    
    
},
{timestamps: true}
);

const TravelPost = mongoose.model("Travel Post", travelPost);

module.exports = TravelPost;