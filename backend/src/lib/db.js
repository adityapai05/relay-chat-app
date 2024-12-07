import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = async () => {
    console.log("MONGODB_URI:", process.env.MONGO_DB_URI);
    console.log("All ENV Vars:", process.env);
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log( `MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err)
    {
        console.log(`MongoDB Connection Failed: ${err}`);
    }
}