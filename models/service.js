const { Schema, model } = require("mongoose");

// declare schema for service
const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// create a Modal from the schema
const Service = model("Service", serviceSchema);

// setup root route
module.exports = Service;
