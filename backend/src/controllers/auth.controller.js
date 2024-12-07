import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // a salt is a random string that's added to a password before hashing to make the resulting hash unpredictable
    const salt = await bcrypt.genSalt(10); // 10 is the salt rounds, indicating computational cost.
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save(); // Save the new user to the database.

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    console.log("Error in Signup Controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate a JSON Web Token (JWT) for the authenticated user and set it in a cookie
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Error in Login Controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the JWT cookie by setting it with an empty value and maxAge of 0
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (err) {
    console.log("Error in Logout Controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to update the user's profile picture
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile Picture is Required" });
    }

    // Upload the profile picture to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Update the user's profile with the new profile picture URL from Cloudinary
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url }, // Set the profilePic field to the Cloudinary URL
      { new: true } // Return the updated document after the update operation
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error in updateProfile Controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to check the authentication status of the user
export const checkAuth = (req, res) => {
  try {
    // Return the authenticated user object stored in the req.user from protectRoute middleware
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in checkAuth Controller", err.message);
    res.status(500).json({ message: "Internal Server Errror" });
  }
};
