const Review = require("../models/review");

const getReviews = async (rating, page = 1, itemsPerPage = 4) => {
  let filter = {};
  if (rating) {
    filter.rating = rating;
  }

  const reviews = await Review.find(filter)
    .limit(itemsPerPage) // limit the number items
    //.skip(page * itemsPerPage - itemsPerPage)
    .skip((page - 1) * itemsPerPage)
    .sort({ _id: -1 });
  return reviews;
};
const getReview = async (id) => {
  const review = await Review.findById(id);
  return review;
};
const addReview = async (customerName, customerEmail, rating, reviewText) => {
  const existingReview = await Review.findOne({
    customerEmail: customerEmail,
  });

  if (existingReview) {
    throw new Error("You have already submitted a review.");
  }
  // 3. create a new review in mongodb
  const newReview = new Review({
    customerName,
    customerEmail,
    rating,
    reviewText,
  });
  await newReview.save();

  return newReview;
};

const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

module.exports = {
  getReviews,
  getReview,
  addReview,
  deleteReview,
};
