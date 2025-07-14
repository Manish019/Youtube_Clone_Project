import { getAllvideo, deleteVideo, getAllvideoByUserId, getUser, searchVideos, singleVideoById, updateBanner, uploadVideo, updateVideo, getUserWithoutLogin } from "../controller/video.controller.js";
import { verify } from "../middleware/authentication.js";

export function videoRoutes(app){
app.post('/video',verify,uploadVideo)
app.get('/allvideo',getAllvideo)
app.get('/getVideoId/:id',singleVideoById)
app.get('/:userId/channel',getAllvideoByUserId)
app.put('/update-banner/:userId',verify,updateBanner)
app.get('/get-user/:userId',verify,getUser)
app.get('/user/:userId',getUserWithoutLogin)
  app.get("/search", searchVideos);
  app.delete("/delet/video/:id", verify, deleteVideo);
 app.put('/update/video/:id', verify, updateVideo);
}