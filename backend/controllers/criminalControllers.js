const cloudinary = require('cloudinary').v2;
const asyncHandler = require("express-async-handler");
const Criminal=require("../models/criminals");
const Dataset = require('../models/dataset');



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addCriminal= async (req, res) => {

    const{encoding}=req.body;
    const encodedArray = encoding.split(",");
    console.log("Encoded Array: ", encodedArray);
    const {name,crime,reportStation}=req.body;
    if (!name || !crime||!reportStation ) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    // Photo Upload Functionality
    let profileImgURL;
    const file = req.files.file;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      profileImgURL = result.url;
    });


    const criminal = await new Criminal({
      name,
      crime,
      reportStation,
      profileImgURL
    });
    criminal.save();


    const dataset = await Dataset.findOne({_id:"dataset"});

    console.log(dataset);
    dataset.key.push(encodedArray);
    // console.log(dataset.value);
    dataset.value.push(String(criminal._id));
    dataset.save();


    if (criminal ) {
      res.status(201).json({
        _id: criminal._id,
        name: criminal.name,
        crime: criminal.crime,
        reportStation:criminal.reportStation,
        pic_url:criminal.pic_url,
      });
    }
     else {
      res.status(400);
      throw new Error("criminal not found");
    }



  };


module.exports={addCriminal};
