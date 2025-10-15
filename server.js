// load the environment variable
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// setup an express app
const app = express();

// setup middleware to handle json request
app.use(express.json());

// setup cors policy
app.use(cors());

// connect to MongoDB using Mongoose

async function connectToMongoDB() {
  try {
    // wait for the mongodb to connect
    await mongoose.connect(process.env.MONGODB_URL + "/spa");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

// triggers the connect with MongoDB
connectToMongoDB();

// setup root route
app.get("/api", (req, res) => {
  res.send("Happy coding!");
});

app.use("/api/services", require("./routes/service"));
app.use("/api/image", require("./routes/image"));
app.use("/api/users", require("./routes/user"));
app.use("/api/appointments", require("./routes/appointment"));
app.use("/api/reviews", require("./routes/review"));
app.use("/api/gallery", require("./routes/gallery"));

// seta folder as a static path
app.use("/api/uploads", express.static("uploads"));

// start the express
app.listen(5123, () => {
  console.log("Server is running at http://localhost:5123");
});
