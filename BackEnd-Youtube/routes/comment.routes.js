import { commentController, editComment, deleteComment, getCommentByVideoId } from "../controller/comment.controller.js";
import { verify } from "../middleware/authentication.js";

export function commentRoutes(app){
 app.post('/comment',verify,commentController)
 app.get('/comment/:videoId',getCommentByVideoId)
app.delete('/comment/:id', verify, deleteComment);
app.put('/edit-comment/:id', verify, editComment);
}