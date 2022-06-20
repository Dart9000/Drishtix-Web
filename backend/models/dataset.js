const mongoose = require("mongoose");


const datasetSchema = new mongoose.Schema(
    {
    _id:String,
     key:[],
     value:[String ]
    },
    { timestaps: true }
  );

  const Dataset= mongoose.model("Dataset",datasetSchema);

  module.exports=Dataset;
