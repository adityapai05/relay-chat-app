import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "akshat.gohil@gmail.com",
    fullName: "Akshat Gohil",
    password: "123456",
    profilePic: "",
  },
  {
    email: "anuj.yadav@gmail.com",
    fullName: "Anuj Yadav",
    password: "123456",
    profilePic: "",
  },
  {
    email: "parth.patel@gmail.com",
    fullName: "Parth Patel",
    password: "123456",
    profilePic: "",
  },
  {
    email: "vedant.rana@gmail.com",
    fullName: "Vedant Rana",
    password: "123456",
    profilePic: "",
  },
  {
    email: "chirag.varu@gmail.com",
    fullName: "Chirag Varu",
    password: "123456",
    profilePic: "",
  },
  {
    email: "monil.parikh@gmail.com",
    fullName: "Monil Parikh",
    password: "123456",
    profilePic: "",
  },
  {
    email: "suren.kotian@gmail.com",
    fullName: "Suren Kotian",
    password: "123456",
    profilePic: "",
  },
  {
    email: "sarvagya.jalan@gmail.com",
    fullName: "Sarvagya Jalan",
    password: "123456",
    profilePic: "",
  },
  {
    email: "krishna.rao@gmail.com",
    fullName: "Krishna Rao",
    password: "123456",
    profilePic: "",
  },
  {
    email: "sumit.thakur@gmail.com",
    fullName: "Sumit Thakur",
    password: "123456",
    profilePic: "",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
