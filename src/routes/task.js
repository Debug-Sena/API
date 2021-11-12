const router = require("express").Router();
const client = require("../config/databaseconfig");
const taskMapper = require("../models/TaskModel");
const trafficMapper = require("../models/TrafficModel");
const filesMapper=require("../models/FilesModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const {send} =require("../services/mailServices")
const uploaddata =async (data, filename) => {
      await fs.writeFile("./src/images/" + filename, data, (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
         
         
        }
        //file written successfully
      });
   
}
router.post("/document", async (req, res) => {
  try {
    const data = req.body;
    const filename = uuidv4() + ".txt";
      const rw = await filesMapper.findAll();
        let fileid= rw._rs.rowLength + 1;
    await uploaddata(req.body.data, filename);
    await filesMapper.insert({
      id: fileid,
      name: req.body.name,
      url: "http://localhost:5000/images/" + filename,
      userid: req.body.userid,
      doctorname:req.body.doctorname,
      date:req.body.date
    });

    res.status(200).json({message:"sucessful"});
    
  } catch (error) {
    res.send({
      status: false,
      message: "File Uploaded Failed",
      data: error,
    });
  }
});

router.get("/document/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM files WHERE userid=?  ALLOW FILTERING";

    const id = req.params.id+"";

    const data = await client.execute(query, [id], {
      hints: ["text"],
    });
    res.status(200).json({
      message: "sucessful",
      data: data.rows,
    });
  } catch (error) {
    res.send({
      status: false,
      message: "coulden't get files",
      data: error,
    });
  }
});

router.post("/mail",async(req,res)=>{
  try {
    const id=req.body.id;
    const userid=req.body.userid;
 const query = "SELECT * FROM doctor WHERE id=?  ALLOW FILTERING";

 

 const data = await client.execute(query, [id], {
   hints: ["int"],
 });

  await send(data.rows[0].email, "your are authorized to view patient details https://domin.com/patient/"+userid, "Authorization");
    
    

    res.status(200).json({message:"sucessful"});
    
  } catch (error) {
    res.send({
      status: false,
      message: "mail error",
      data: error,
    });
  }
});

 




module.exports = router;
