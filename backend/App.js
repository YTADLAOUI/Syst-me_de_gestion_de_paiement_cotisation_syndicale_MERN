const express= require("express");
require('dotenv').config();
const ConnectionController = require("./src/database/ConnectionController");
const app= express();


const SERVER_PORT=process.env.SERVER_PORT



ConnectionController.conn()

app.listen(5000,()=>{
  console.log(`server run in port ${SERVER_PORT} ...`)
})