import userModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUpUser(req, res) {
  try {
    const { channelName, profileUrl, password, userName } = req.body;

    if (!channelName || !profileUrl || !password || !userName) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
  // Password strength validation using regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        success: false,
      });
    }
    // this code check that user exist in collection userModel
    const userExist = await userModel.findOne({ userName });
    if (userExist) {
      return res
        .status(404)
        .json({ message: "User all ready exist ", success: false });
    }
    // password hashing code write here
    let hashPassword = bcrypt.hashSync(password, 10);
    // after bcrypt  password save data base
    const newUser = await userModel.create({
      channelName,
      profileUrl,
      userName,
      password: hashPassword, // use correct field
    });
    console.log(newUser, "newUser");
    res.status(200).json({
      message: "user Register Successful ",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
}

// login logic code here

export async function loginUser(req, res) {
  try {
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });
    if (!password || !userName) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

  
    if (!user) {
      return res
        .status(404)
        .json({ message: "User  is not registered ", success: false });
    }
    // if the user is exist than check the password db
    let vaild = bcrypt.compareSync(password, user.password);
    if (!vaild) {
      return res.status(404).json({ error: " Invaild Password" });
    }
   

    // create a token
    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "15d" });
    // console.log(user);
    console.log("token", token);

    return res.status(200).json({
      message: "user logged-in successfully!",
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(404).json({ error: err.message, success: false });
  }
}
