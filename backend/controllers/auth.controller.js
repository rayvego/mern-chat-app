import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async (req, res) => {
  try {
    const { username, password, fullName, confirmPassword, gender } = req.body; // expecting in json format
    if (password !== confirmPassword) {
      // 400 stands for bad request (client's fault)
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // first check if the user already exists or not based on the username, so username is unique be unique
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // generating profile picture using dicebear
    const profilePicture = `https://api.dicebear.com/8.x/initials/svg?seed=${username}`;

    // creating a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      gender,
      profilePicture,
    });

    if (newUser) {
      // Generate JWT token upon signing up
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      // 201 Created indicates that a request has been successfully fulfilled and has
      // resulted in the creation of a new resource.
      res.status(201).json({
        message: "User registered successfully",
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // authenticating using bcrypt compare method
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    // Generate JWT token upon logging in
    generateTokenAndSetCookie(user._id, res);

    // 200 OK indicates that a request has succeeded and the server has returned the requested resource.
    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clearing the cookie
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};