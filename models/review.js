const { Schema, model } = require("mongoose");

// declare schema for review
const reviewSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
    required: true,
  },
});

// create a Modal from the schema
const Review = model("Review", reviewSchema);

// setup root route
module.exports = Review;
