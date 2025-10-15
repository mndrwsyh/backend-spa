const Appointment = require("../models/appointment");
const Service = require("../models/service");

const getServices = async (price, duration) => {
  // filter the price and duration in ascending order (least to most)
  let sort = {};
  if (price) {
    sort.price = 1;
  }
  if (duration) {
    sort.duration = 1;
  }

  const services = await Service.find().sort({ ...sort, _id: -1 });
  return services;
};

const getService = async (id) => {
  const service = await Service.findById(id);
  return service;
};
const addNewService = async (name, price, duration, description, image) => {
  // 3. create a new service in mongodb
  const newService = new Service({
    name,
    price,
    duration,
    description,
    image,
  });
  await newService.save();

  return newService;
};
const updateService = async (id, name, price, duration, description, image) => {
  const updatedService = await Service.findByIdAndUpdate(
    id,
    {
      name,
      price,
      duration,
      description,
      image,
    },
    {
      new: true,
    }
  );
  return updatedService;
};

const deleteService = async (id) => {
  const serviceInAppointment = await Appointment.findOne({
    service: id,
  });

  if (serviceInAppointment) {
    throw new Error(
      "This service is used in an existing appointment and cannot be deleted."
    );
  }
  return await Service.findByIdAndDelete(id);
};

module.exports = {
  getServices,
  getService,
  addNewService,
  updateService,
  deleteService,
};
