const router = require("express").Router();
const client = require("../config/databaseconfig");
const workMapper = require("../models/WorkspaceModel");
const teamMapper = require("../models/TeamModel");

const { v4: uuidv4 } = require("uuid");
router.post("/create",async (req,res)=>{
    console.log(req.body)
     try {
         console.log("create");
       const rw = await workMapper.findAll();
        
       let workid = rw._rs.rowLength + 1;
       await workMapper.insert({
         id: workid,
         name: req.body.name,
         admin: parseInt(req.body.admin),
         status: "active",
       });
    
    const query = "SELECT * FROM user WHERE id=? ALLOW FILTERING";
    const userData = await client.execute(query, [req.body.admin], {
      hints: ["int"],
    });

    const user = userData.rows[0];
  await teamMapper.insert({
    id: uuidv4(),
    email: user.email,
    workspaceid: workid,
    role: "admin",
    workspacename:req.body.name,
  });
   
       const data=req.body.team.split(",")
      data.map(async(item)=>{
           console.log(item)
            
        
        
    
           await teamMapper.insert({
             id: uuidv4(),
             email: item,
             workspaceid: workid,
             role: "team",
             workspacename: req.body.name
           });
       })

     
         res.status(200).json({ message:"sucessful"});
     } catch (err) {
       console.log(err);
       res.status(500).json({ message: "Something gone Wrong" + err });
     }

})
router.put("/update/:id", async (req, res) => {
  try {
   const id=req.params.id;
    await workMapper.insert({
      id: id,
      status: "complete",
    });

    res.status(200).json({ message: "sucessful"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

router.get("/getList/:id", async (req, res) => {
  try {
        const query = "SELECT * FROM user WHERE id=? ALLOW FILTERING";
        const userData = await client.execute(query, [req.params.id], {
          hints: ["int"],
        });

        const user = userData.rows[0];
        const email=user.email;
         const query2 = "SELECT * FROM team WHERE email=? ALLOW FILTERING";
         const workData = await client.execute(query2, [email], {
           hints: ["text"],
         });
         const resData = workData.rows.filter(async(item)=>{
            const query2 = "SELECT * FROM workspace WHERE id=? ALLOW FILTERING";
            const data = await client.execute(query2, [item.workspaceid], {
              hints: ["int"],
            });
            const value=data.rows[0]
            if(value.status=="active")
            return item
            
         })
         res.status(200).json({message:resData})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

module.exports = router;
