const { Schema, model } = require("mongoose");

// declare schema for products
const appointmentSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  // linkage between the service n appointment (similar to sql foreign key)
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
  petBreed: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed"], // enum limit the value to the provided option only
  },
  date: Date,
});

// create a Modal from the schema
const Appointment = model("Appointment", appointmentSchema);

// setup root route
module.exports = Appointment;
