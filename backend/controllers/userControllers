const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");



//@description     Auth the user
//@route           POST /api/users/register
//@access          only admin 

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });



//@description     Auth the user
//@route           POST /api/users/login
//@access          access for users registered by admin 

  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {

      const token=generateToken(user._id);
       // Setting Up cookies
       const options = {
        expires: new Date(Date.now() + 24*60*60*1000),
        httpOnly: true
      };
        // sending token inside cookie  
      res.status(200).cookie("token",token,options).json({
        success:true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
        Admin: user.isAdmin,
       });
    
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  
  module.exports = {  registerUser, authUser };