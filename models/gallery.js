const { Schema, model } = require("mongoose");

// declare schema for gallery
const gallerySchema = new Schema({
  image: String,
});

// create a Modal from the schema
const Gallery = model("Gallery", gallerySchema);

// setup root route
module.exports = Gallery;
