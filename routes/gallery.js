const express = require("express");
// set up gallery router
const router = express.Router();
const { isValidUser, isAdmin } = require("../middleware/auth");

const {
  getGalleries,
  getGallery,
  addNewGallery,
  deleteGallery,
} = require("../controllers/gallery");

// get galleries
router.get("/", async (req, res) => {
  try {
    const galleries = await getGalleries();
    res.status(200).send(galleries);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// get gallery
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const gallery = await getGallery(id);
    res.status(200).send(gallery);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// create gallery
router.post("/", isAdmin, async (req, res) => {
  try {
    const image = req.body.image;

    // make sure all fields are not empty
    if (!image) {
      return res.status(400).send({
        message: "Please insert an image.",
      });
    }

    res
      .status(200)
      // short hand
      .send(await addNewGallery(image));
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// delete gallery
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteGallery(id);
    res.status(200).send({
      message: `Photo #${id} has been deleted from gallery.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

module.exports = router;
