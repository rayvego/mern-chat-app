import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// this middleware is to protect the routes that require authentication using JWT
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // this will return the payload of the token if the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // removing the password so that it is not sent to the client later on
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // setting the user object in the request object so that it can be accessed in the controllers
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;