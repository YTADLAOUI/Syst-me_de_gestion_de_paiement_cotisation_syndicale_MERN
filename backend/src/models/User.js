const mongoose  = require("mongoose");

 schema= mongoose.Schema;


  const userSchema = new schema({
    name:{
      type : String,
      required : true,
    },
    email:{
      type: String,
      required: true,
      unique:true
    },
    password:{
      type:String,
      require:true,
    },  
    isEmailVerfied:{
      type:Boolean,
      require:true
    },
    isDeleted:{
      type:Boolean,
      require:true
    }
  },{timestamps:true});
  
  const userModel=mongoose.model("Users",userSchema);
  
  module.exports={userModel}




 