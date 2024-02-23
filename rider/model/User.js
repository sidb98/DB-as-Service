import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    email: String,
    rideHistory: [mongoose.Schema.Types.ObjectId],
  });
  
export const User = mongoose.model("User", userSchema);