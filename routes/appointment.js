const express = require("express");
// set up appointment router
const router = express.Router();
const { isValidUser, isAdmin } = require("../middleware/auth");

const {
  getAppointments,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment");

// get app
router.get("/", isValidUser, async (req, res) => {
  try {
    const service = req.query.service;
    const appointment = await getAppointments(service, req.user);
    res.status(200).send(appointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

// get appointment
router.get("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await getAppointment(id);
    res.status(200).send(appointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

// create appointment
router.post("/", isValidUser, async (req, res) => {
  try {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const service = req.body.service;
    const petName = req.body.petName;
    const petBreed = req.body.petBreed;
    const date = req.body.date;

    // make sure all fields are not empty
    if (
      !customerName ||
      !customerEmail ||
      !service ||
      !petName ||
      !petBreed ||
      !date
    ) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      // short hand
      .send(
        await addAppointment(
          customerName,
          customerEmail,
          service,
          petName,
          petBreed,
          date
        )
      );
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// update appointment
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    res.status(200).send(await updateAppointment(id, status));
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

// delete appointment
router.delete("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAppointment(id);
    res.status(200).send({
      message: `Appointment #${id} has been deleted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
