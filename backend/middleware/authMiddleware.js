const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler"); // gives the async error handling

const protect = asyncHandler(async (req, res, next) => {
    try {
       // looking for token in the header
    let authHeaderVal = req.cookies.token || req.headers.authorization;

    if (!authHeaderVal) {
      return res.status(403).send("token not found");
    }


     const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = decoded // to exclude password and include info of user
      next();
    }catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
});


// this is for allowing access to only super admin or admin
const adminProtect = asyncHandler(async (req, res, next) => {
  try {
     // looking for token in the header
  let authHeaderVal = req.cookies.token || req.headers.authorization;

  if (!authHeaderVal) {
    return res.status(403).send("token not found");
  }


   const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header

    //decodes token id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userData = decoded // to exclude password and include info of user
    if(req.userData.isAdmin){
      return next();
    }
    else {
       res.status(401).send("Not authorized ,token failed");
    }
      }
  catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});


module.exports = { protect ,adminProtect};
