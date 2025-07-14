import { loginUser, signUpUser } from "../controller/user.controller.js";

export function userRoutes(app){

 app.post('/signup' ,signUpUser)
 app.post('/login' ,loginUser)

}