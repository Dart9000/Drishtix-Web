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

  try{
    const{encoding}=req.body;
    const encodedArray = encoding.split(",");
    console.log(encodedArray);
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

    console.log(profileImgURL);

    const criminal = await new Criminal({
      name,
      crime,
      reportStation,
      profileImgURL
    });

    criminal.save();
    console.log(criminal);

    // asumming and making sure dataset exits
    const dataset = Dataset.findOne({_id:"dataset"});

    if(!dataset){
      dataset = await new Dataset({
       _id:"dataset",
       $push:{key:encodedArray},
       $push:{value:criminal._id}
      });

    }
    else{
      console.log(dataset);
      dataset.key.push(encodedArray);
      dataset.value.push(String(criminal._id));
    }
    dataset.save();

    if (criminal ) {
      res.status(201).json({
        _id: criminal._id,
        name: criminal.name,
        crime: criminal.crime,
        reportStation:criminal.reportStation,
        pic_url:criminal.pic_url,
        dataset:dataset
      });

    } else {
      res.status(400);
      throw new Error("criminal not found");
    }

  }
  
  catch(e){
    console.log(e);
  }


};


module.exports={addCriminal};
