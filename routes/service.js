const express = require("express");
// set up service router
const router = express.Router();
const { isValidUser, isAdmin } = require("../middleware/auth");

const {
  getServices,
  getService,
  addNewService,
  updateService,
  deleteService,
} = require("../controllers/service");

// get services
router.get("/", async (req, res) => {
  try {
    const price = req.query.price;
    const duration = req.query.duration;
    const services = await getServices(price, duration);
    res.status(200).send(services);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// get service
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const service = await getService(id);
    res.status(200).send(service);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// create service
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const duration = req.body.duration;
    const description = req.body.description;
    const image = req.body.image;

    // make sure all fields are not empty
    if (!name || !price || !duration || !description || !image) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      // short hand
      .send(await addNewService(name, price, duration, description, image));
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// update service
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const duration = req.body.duration;
    const description = req.body.description;
    const image = req.body.image;

    // make sure all fields are not empty
    if (!name || !price || !duration || !description || !image) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      // short hand
      .send(await updateService(id, name, price, duration, description, image));
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// delete service
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteService(id);
    res.status(200).send({
      message: `Service #${id} has been deleted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
