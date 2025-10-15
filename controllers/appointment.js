// import product model
const Appointment = require("../models/appointment");
const dayjs = require("dayjs");

async function getAppointments(service, user) {
  // if role is user, return only users appointment
  // if role is admin, return all appointments
  let filter = {};
  if (service) {
    filter.service = service;
  }

  if (user.role === "admin") {
    return await Appointment.find(filter).populate("service").sort({ _id: -1 });
  } else {
    filter.customerEmail = user.email;
    return await Appointment.find(filter).populate("service").sort({ _id: -1 });
  }
}

async function getAppointment(id) {
  // load the appointment data based on id
  const product = await Appointment.findById(id);
  return product;
}

async function addAppointment(
  customerName,
  customerEmail,
  service,
  petName,
  petBreed,
  date
) {
  const existingAppointment = await Appointment.findOne({
    service,
    date: date,
  });

  if (existingAppointment) {
    throw new Error(
      "This time is already booked for this service. Please choose a different time or date."
    );
  }

  const startTime = dayjs(date).hour(9).minute(0);
  const endTime = dayjs(date).hour(18).minute(0);

  if (dayjs(date).isBefore(startTime) || dayjs(date).isAfter(endTime)) {
    throw new Error(
      "Please choose a time within working hours (9am - 6pm) only."
    );
  }

  // create new product
  const newAppointment = new Appointment({
    customerName,
    customerEmail,
    service,
    petName,
    petBreed,
    date,
  });

  // save the new appointment into mongodb
  await newAppointment.save();

  return newAppointment;
}

async function updateAppointment(id, status, date) {
  return await Appointment.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteAppointment(id) {
  // delete the appointment
  return await Appointment.findByIdAndDelete(id);
}

module.exports = {
  getAppointments,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
