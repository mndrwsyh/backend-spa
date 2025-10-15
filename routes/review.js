const express = require("express");
// set up review router
const router = express.Router();
const { isValidUser, isAdmin } = require("../middleware/auth");

const {
  getReviews,
  getReview,
  addReview,
  deleteReview,
} = require("../controllers/review");

// get reviews
router.get("/", async (req, res) => {
  try {
    const rating = req.query.rating;
    const page = req.query.page;
    const reviews = await getReviews(rating, page);
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// get review
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const review = await getReview(id);
    res.status(200).send(review);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// create review
router.post("/", isValidUser, async (req, res) => {
  try {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const rating = req.body.rating;
    const reviewText = req.body.reviewText;

    // make sure all fields are not empty
    if (!customerName || !customerEmail || !rating || !reviewText) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      // short hand
      .send(await addReview(customerName, customerEmail, rating, reviewText));
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// delete review
router.delete("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteReview(id);
    res.status(200).send({
      message: `Review #${id} has been deleted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

module.exports = router;
