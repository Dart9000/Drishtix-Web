const asyncHandler = require("express-async-handler");
const Criminal=require("../models/criminals");


const addCriminal= asyncHandler( async (req, res)=>{
const {name,crime,report_station}=req.body;

if (!name || !crime||!report_station ) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const criminal= await Criminal.create({
    name,
    crime,
    report_station,
   
  });

  if (criminal) {
    res.status(201).json({
      _id: criminal._id,
      name: criminal.name,
      crime: criminal.crime,
      report_station:criminal.report_station,
      // pic_url:criminal.pic_url
    
    });

  } else {
    res.status(400);
    throw new Error("criminal not found");
  }


});


module.exports={addCriminal};