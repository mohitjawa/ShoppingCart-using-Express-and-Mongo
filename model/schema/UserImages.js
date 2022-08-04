const { string } = require("joi");
const mongoose = require("mongoose");


const UserImagesDetail = new mongoose.Schema({
  ImageUrl: { type: String },
  UserId: {
    type: String,
    ref: "User",
  },
});

module.exports = mongoose.model("UserImages", UserImagesDetail);
