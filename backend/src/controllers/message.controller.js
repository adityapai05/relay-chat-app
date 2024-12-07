import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js"
import {v2 as cloudinary} from "cloudinary"

// Controller to fetch all users (excluding the logged-in user) to display in the sidebar
export const getUsersFromSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find all users excluding the logged-in user and omit the password field from the results
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }, // Exclude the logged-in user from the list
    }).select("-password"); // Omit password from the response

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUsersFromSidebar Controller", err.message);
    res.send(500).json({ message: "Internal Server Error" });
  }
};

// Controller to fetch all messages between the logged-in user and a specific user (identified by ID in URL)
export const getMessages = async (req, res) => {
  try {
    // Get the recipient's ID from the URL parameters
    const { id: otherUserId } = req.params;
    const myId = req.user._id;

    // Find all messages between the two users (senderId and receiverId can be either the logged-in user or the other user)
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId }, // Messages sent from the logged-in user to the other user
        { senderId: otherUserId, receiverId: myId }, // Messages sent from the other user to the logged-in user
      ],
    });
    res.status(200).send(messages);
  } catch (err) {
    console.log("Error in getMessages Controller: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to send a message to a specific user
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // If an image is provided, upload it to Cloudinary and get the URL
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create a new message object with the sender, receiver, text, and optional image URL
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);
      if(receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
      }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage Controller: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
