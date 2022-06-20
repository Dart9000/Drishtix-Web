const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");


const nodemailer = require('nodemailer');

//@description     Auth the user
//@route           POST /api/users/register
//@access          only admin

const registerUser = asyncHandler( async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email ) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    let otp = Math.floor(Math.random() * 100000); //Generating a randon number

    const user = await User.create({
      name,
      email,
      password:"123",
      otp
    });

    const regLink = `http://localhost:3000/handover_user/${email}/${otp}`
    //html mail template
    const output = `
            <div style="text-align: center">
              <h3>Register Link: ${regLink}</h3>
              <p><b>Thank you.</b></p>
            </div>
          `;

    const transporter = await nodemailer.createTransport({

      service: 'gmail',
      secureConnection: true,
      auth: {
        user: process.env.AUTHER_GMAILID,
        pass: process.env.AUTHER_PASSWORD
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
        secureProtocol: "TLSv1_method"
      }
    });

    var mailOptions = {
      from: `Drishti<${process.env.AUTHER_GMAILID}>`,
      to: email, //Change reciving email here
      subject: `Registration Link`,
      text: '',
      html: output
    };

    await transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
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

      user.password = undefined;

      const token=generateToken(user);
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

  const handle = async (req, res) => {
    const {email, otp, password} = req.body;

    const user = await User.findOne({ email });
    if(user.otp == otp){
      user.password = password;
      user.otp = undefined;

      await user.save();
      res.status(200).send("Done");
    }

  }

  module.exports = {  registerUser, authUser, handle };
