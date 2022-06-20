const mongoose = require("mongoose");


const criminalSchema = new mongoose.Schema(
    {
      name: { type: "String", required: true },
      crime: { type: "String", unique: true, required: true },
      reportStation: { type: "String", required: true },
      profileImgURL : {type:String,required:true}
    },
    { timestaps: true }
  );

  const Criminal = mongoose.model("Criminal",criminalSchema,);

  module.exports=Criminal;
