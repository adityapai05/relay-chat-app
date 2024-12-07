import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes by verifying the user's authentication
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Retrieve the JWT from cookies
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Find the user in the database by the ID stored in the token payload
    const user = await User.findById(decoded.userId).select("-password"); // Exclude the password field from the returned user document

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Attach the user object to the `req` object for use in subsequent middleware or routes
    req.user = user;

    // Call `next` to pass control to the next middleware or route handler
    next();
  } catch (err) {
    console.log("Error in protectRoute Middleware", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
