const mongoose = require("mongoose");


const criminalSchema = new mongoose.Schema(
    {
      name: { type: "String", required: true },
      crime: { type: "String", unique: true, required: true },
      report_station: { type: "String", required: true },
      // pic_url : {type:String,required:true}
    },
    { timestaps: true }
  );

  const Criminal = mongoose.model("Criminal",criminalSchema,);

  module.exports=Criminal;

