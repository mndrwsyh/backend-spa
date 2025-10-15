const { Schema, model } = require("mongoose");

/*
Fields:
- name
- email
- password
- image
- role
*/
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure email entered is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // enum to control value for role
    default: "user",
  },
});

const User = model("User", userSchema);
module.exports = User;
