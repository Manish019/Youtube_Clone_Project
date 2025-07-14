import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", //user collection 
      required: true,
    },
    title: {                    
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoCategory: {
      type: String,
      default: "All",
    },
    like: {
      type: Number,
      default:0
    },
    dislike: {
      type: Number,
      default:0
    },
    views:{
      type:Number,
      default:0
    }
  
  },
  { timestamps: true }
);
const videoModel = mongoose.model("video", videoSchema);

export default videoModel;
