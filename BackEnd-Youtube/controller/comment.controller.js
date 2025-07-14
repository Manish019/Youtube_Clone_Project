import commentModel from "../models/Comment.model.js";

export async function commentController(req, res) {
  try {
    let { video, message } = req.body;

    const comment = await commentModel.create({
      user: req.verifyUser._id,
      video,
      message,
    });

    //  Yeh line add karo to populate user info
    await comment.populate("user", "userName profileUrl channelName");

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}


// particular video id se us video ka comment get karna ka logic

export async function getCommentByVideoId(req, res) {
  // console.log("commnet video id",req.params);
  let { videoId } = req.params;
  const comments = await commentModel
    .find({ video: videoId })
    .populate("user", "userName channelName profileUrl");
  console.log("comment", comments);
  return res.status(201).json({
    success: true,

    comments,
  });
}
// ============================================

export async function deleteComment(req, res) {
  const { id } = req.params; // This is the commentId
  const userId = req.verifyUser._id.toString(); // From middleware

  console.log("Logged-in User ID:", userId);
  console.log("Comment ID to delete:", typeof id);

  try {
    const comment = await commentModel.findById(id); // Find comment by ID

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    //  Check if the comment belongs to the logged-in user
    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        message: "You can delete only your own comment",
      });
    }

    //  Delete the comment
    await commentModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// =================================
// edit comment

export const editComment = async (req, res) => {
 const commentId = req.params.id;
  const { message } = req.body;

  try {
    const comment = await commentModel.findById(commentId);
    console.log("edit comment",comment);
    

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    //  Check if logged-in user is the owner
    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not allowed to edit this comment" });
    }

    //  Update message
    comment.message = message;
    await comment.save();

    return res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};