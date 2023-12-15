const express= require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const Connection = require("./src/database/Connection");
const AuthRoute = require("./src/routes/AuthRoute");
const AppertementRoute = require("./src/routes/AppertementRoute");
const PaymentRoute=require("./src/routes/PaymentRoute");
const cors = require('cors');
const app= express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
      origin: "http://localhost:5173",
      credentials: true,
  })
);
app.use("/api/auth",AuthRoute);
app.use("/api/appertement",AppertementRoute);
app.use("/api/payments",PaymentRoute);

const SERVER_PORT=process.env.SERVER_PORT
Connection.conn()
app.listen(5000,()=>{
  console.log(`server run in port ${SERVER_PORT} ...`)
})