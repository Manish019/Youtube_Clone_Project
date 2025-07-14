import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileUrl: {    
      type: String,
      required: true,
    },
    banner: String,
    
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

export default userModel;
