const express= require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const ConnectionController = require("./src/database/ConnectionController");
const AuthRoute = require("./src/routes/AuthRoute");
const app= express();

app.use(express.json());
app.use(cookieParser());

const SERVER_PORT=process.env.SERVER_PORT

app.use("/api/auth",AuthRoute)

ConnectionController.conn()

app.listen(5000,()=>{
  console.log(`server run in port ${SERVER_PORT} ...`)
})