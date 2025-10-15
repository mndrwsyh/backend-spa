const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controllers/user");

// to check if the user is a valid user (control whether anyoen who calling the api is a valid logged in user)

const isValidUser = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    // method 1 (replace)
    // console.log(authorization.replace("Bearer ", ""));
    // method 2 (split)
    const token = authorization.split(" ")[1];
    // console.log(token);
    // 2. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3. get the user data by email
    const user = await getUserByEmail(decoded.email);
    // 4. verify the user
    if (user) {
      // add the user data into the request
      req.user = user;
      // trigger the next function
      next();
    } else {
      res.status(400).send({ error: "YOU SHALL NOT PASS." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "YOU SHALL NOT PASS." });
  }
};

// to hceck if the user is an admin ornot

const isAdmin = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    // method 1 (replace)
    // console.log(authorization.replace("Bearer ", ""));
    // method 2 (split)
    const token = authorization.split(" ")[1];
    // console.log(token);
    // 2. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3. get the user data by email
    const user = await getUserByEmail(decoded.email);
    // 4. verify the user
    if (user && user.role === "admin") {
      // add the user data into the request
      req.user = user;
      // trigger the next function
      next();
    } else {
      res.status(400).send({ error: "YOU SHALL NOT PASS." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "YOU SHALL NOT PASS." });
  }
};

module.exports = {
  isValidUser,
  isAdmin,
};
