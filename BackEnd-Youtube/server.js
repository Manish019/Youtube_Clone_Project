import express from 'express';
// import dotenv from "dotenv";
// import './dataBase/Db.js'
import mongoose from 'mongoose';

import { userRoutes } from './routes/user.routes.js';
import { commentRoutes } from './routes/comment.routes.js';
import { videoRoutes } from './routes/video.routes.js';
import cors from 'cors';
const app =express();

app.use(express.json());

// front end integration Here
app.use(cors({
    origin:"http://localhost:5173",
     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

}));

// db connection

mongoose.connect('mongodb+srv://arayanmanish:NXGaq8lrILYBT2xg@cluster0.m1mvsbb.mongodb.net')

.then(() => {
  console.log('Server is Runniing');
})
.catch((err) => {
  console.log(err, "Server Is Failed");
})




const PORT = 5050;
app.get('/',(req,res)=>{
    res.send("Welcom! to youtube Backend")
})



// routes call here
commentRoutes(app);
userRoutes(app);
videoRoutes(app);

app.listen(5050,()=>{
    console.log(`Server connect To PORT => ${PORT}`);
    
})






