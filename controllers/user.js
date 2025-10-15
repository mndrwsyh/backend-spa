const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const login = async (email, password) => {
  // 1. check if the email provided is in the system
  const user = await getUserByEmail(email);
  // if not exist show error
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  // if exist, compare password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password.");
  }

  // generate JWT token
  let token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET, // secret
    { expiresIn: 60 * 60 * 8 } // expires in 8 hours
  );

  // if password correct, return user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
  //
};

const signup = async (name, email, password) => {
  // 1. check if the email provided is already exist ornot
  const emailExists = await User.findOne({ email: email });
  // if email exist, throw error
  if (emailExists) {
    throw new Error(
      "Email already exists. Please use another email or login with your existing email."
    );
  }
  // 2. create the new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
  });

  // 3. save the user
  await newUser.save();

  // 4. generate JWT token
  let token = jwt.sign(
    {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET, // secret
    { expiresIn: 60 * 60 * 8 } // expires in 8 hours
  );

  // 5. return the user
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

module.exports = {
  login,
  signup,
  getUserByEmail,
};
