const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    travelPost: {
        type: Schema.Types.ObjectId,
        ref: "TravelPost"
    }
},
{timestamps: true}
);

const Like = mongoose.model("Likes", LikeSchema);

module.exports = Like;