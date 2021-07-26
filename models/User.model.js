const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ""
  },
/*   travelPosts: {
    type: Schema.Types.ObjectId,
    ref: "TravelPost"
  } */

});

const User = model("User", userSchema);

module.exports = User;
