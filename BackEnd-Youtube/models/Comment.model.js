import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", //user collection 
      required: true,
    },
    video: {
       type: mongoose.Schema.Types.ObjectId,
       ref:"video",        // vide collection 
      required: true,
    },
    message: {
      type: String,
      required:true
    },
    
  },
  { timestamps: true }
);
const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
