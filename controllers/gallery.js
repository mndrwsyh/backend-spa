const Gallery = require("../models/gallery");

const getGalleries = async () => {
  const galleries = await Gallery.find().sort({ _id: -1 });
  return galleries;
};
const getGallery = async (id) => {
  const gallery = await Gallery.findById(id);
  return gallery;
};
const addNewGallery = async (image) => {
  // 3. create a new gallery in mongodb
  const newGallery = new Gallery({
    image,
  });
  await newGallery.save();

  return newGallery;
};

const deleteGallery = async (id) => {
  return await Gallery.findByIdAndDelete(id);
};

module.exports = {
  getGalleries,
  getGallery,
  addNewGallery,
  deleteGallery,
};
