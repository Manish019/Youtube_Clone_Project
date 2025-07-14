import userModel from "../models/User.model.js";
import videoModel from "../models/video.model.js";


export async function uploadVideo(req, res) {
  try {
    const { title, desc, thumbnail, videoUrl, videoCategory, like, dislike } =
      req.body;

    console.log(req.verifyUser, "video upload with middleware");
    const videoUplaod = await videoModel.create({
        user: req.verifyUser._id,
      title,
      desc,
      thumbnail,
      videoUrl,
      videoCategory,
      like,
      dislike,
      
    });


    return res.status(201).json({success:true,"video Upload successFull":videoUplaod})
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
}

// get all video 

export async function getAllvideo(req,res){

    try {
    const allVideos = await videoModel.find().populate("user", "userName channelName profileUrl"); // user info bhi lana ho to
    return res.status(200).json({ success: true, videos: allVideos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
 

}

// get Single video by id


export async function singleVideoById(req, res) {
  try {
    const { id } = req.params;
    console.log(id,"asdfghj");
    

    const singleVideo = await videoModel.findById(id).populate("user", "userName channelName profileUrl");

    if (!singleVideo) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    return res.status(200).json({ success: true, singleVideo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// getAll video user id for channel

export async function getAllvideoByUserId(req,res){
try {
    let {userId}=req.params;
    
    
    const video=await videoModel.find({user:userId}).populate("user", "userName channelName profileUrl");
    console.log("videoall",video);
    
    return res.status(201).json({success:true,"Allvideo":video})
} catch (error) {
    return res.status(500).json({ success: false, message: error.message });
}
}

// ====================================


// update-banner
export async function updateBanner(req, res) {
  try {
    const userId = req.verifyUser._id;
    const { banner } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { banner } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Banner updated", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
// ===========================================


export async function getUser(req,res){

  try {
    const user = await userModel.findById(req.params.userId); //  userId hona chahiye
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

}
// ==================================
export async function getUserWithoutLogin(req,res){

  try {
    const user = await userModel.findById(req.params.userId); //  userId hona chahiye
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

}
// =======================================
// search logic

export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;

    // Regular expression for case-insensitive partial match
    const searchRegex = new RegExp(query, "i");

    const results = await videoModel.find({
      $or: [
        { title: { $regex: searchRegex } },
        { videoCategory: { $regex: searchRegex } }
      ]
    }).populate("user", "channelName userName profileUrl");

    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ===============================
// login user delte own video, video/:id

export const deleteVideo = async (req, res) => {
  const videoId = req.params.id;
  // console.log("videoId" ,videoId);
  

  const userId = req.verifyUser._id;
  console.log("userId",typeof userId);
  
  

  try {
    const video = await videoModel.findById(videoId);
    // console.log("video owner",video);
    

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if the logged-in user is the owner of the video
    if (video.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied. You are not the owner of this video." });
    }

    await videoModel.findByIdAndDelete(videoId);

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// =================================================
// 


export const updateVideo = async (req, res) => {
  const videoId = req.params.id;
  const userId = req.verifyUser._id; // JWT se mil raha hai

  try {
    const video = await videoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Verify owner
    if (video.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Access denied. Not the owner of the video.' });
    }

    // Update fields
    const { title, desc, thumbnail, videoUrl } = req.body;

    if (title) video.title = title;
    if (desc) video.desc = desc;
    if (thumbnail) video.thumbnail = thumbnail;
    if (videoUrl) video.videoUrl = videoUrl;

    const updated = await video.save();

    res.status(200).json({
      message: 'Video updated successfully',
      video: updated
    });
  } catch (err) {
    console.error('Update video error:', err);
    res.status(500).json({ message: 'Server error' ,success:false });
  }
};
