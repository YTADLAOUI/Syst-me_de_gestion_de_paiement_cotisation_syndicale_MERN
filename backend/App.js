const express= require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const Connection = require("./src/database/Connection");
const AuthRoute = require("./src/routes/AuthRoute");
const AppertementRoute = require("./src/routes/AppertementRoute");
const app= express();

app.use(express.json());
app.use(cookieParser());

const SERVER_PORT=process.env.SERVER_PORT

app.use("/api/auth",AuthRoute)
app.use("/api/appertement",AppertementRoute)

Connection.conn()

app.listen(5000,()=>{
  console.log(`server run in port ${SERVER_PORT} ...`)
})