const express=require('express');
const cassandra = require("cassandra-driver");
const client=require("./config/databaseconfig");
const dotenv = require("dotenv");
const userMapper=require("./models/UserModel");
const authRoute=require("./routes/auth");
const taskRoute=require("./routes/task");
const workRoute = require("./routes/workspace");
const mail=require("./services/mailServices");
const path = require("path");
const upload=require("express-fileupload");
var cors = require("cors");
var bodyParser = require("body-parser");
const app=express()
app.use(cors());
app.use(upload())
dotenv.config();

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

async function run() {
     await client.connect();
  // Execute a query
  
}
run()
app.use("/api/api/auth", authRoute);
app.use("/api/api/task",taskRoute);
app.use("/api/api/workspace",workRoute);
app.get("/",(req,res)=>{
    res.send("hello this req")
})

app.post("/",(req,res)=>{
    res.send("helloe here");
})
app.listen(process.env.PORT||5000, () => {
  console.log("server is running");
});