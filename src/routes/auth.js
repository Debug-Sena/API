const router = require("express").Router();
const client=require("../config/databaseconfig");
const userMapper=require("../models/UserModel")
const docMapper=require("../models/DoctorModel")
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const query = "SELECT * FROM patient WHERE email=? ALLOW FILTERING";
  
    const data = await client.execute(query, [req.body.email]);
  
    const validate = data.rows[0];
    if (validate) {
      res.status(401).json({ message: "email already exist"});
    } else {
      const rw = await userMapper.findAll();

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const token = await bcrypt.hash(req.body.email + new Date(), salt);

      const data = await userMapper.insert({
        id: rw._rs.rowLength + 1,
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        gender:"none",
        age:"none",
        blood:"none",
        policy:"none",
        policyno:"none"
      });
      res.status(200).json({ message: "sucessful" });
    }
  } catch (err) {
    res.status(500).json({ message: "somthing gone wrong " + err });
  }
});
router.post("/signin", async (req, res) => {
  try {
    const query = "SELECT * FROM patient WHERE email=? ALLOW FILTERING";
    const data = await client.execute(query, [req.body.email]);

    const user = data.rows[0];
  if (!user) {
    res.status(401).json({ message: "email not found" });
  }else
  {
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      res.status(401).json({
        message: "Invalid Password",
      });
    } else {
      const { password, ...others } = user;
      
      res.status(200).json(others);
    }
  }
  } catch (err) {
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

router.get("/getuserdetail/:id", async (req, res) => {
  try {
   
    const query = "SELECT * FROM patient WHERE id=? ALLOW FILTERING";
    const id=parseInt(req.params.id);
    console.log(req.params.id)
    const data = await client.execute(query, [id], { hints: ["int"] });

    const user = data.rows[0];
    if (!user)
      res.status(200).json({ message: "no user details avaliable" });
else{
    const { password, ...others } = user;
   
    res.status(200).json({ message:others });}
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});


router.put("/updateuser/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM patient WHERE id=? ALLOW FILTERING";
    const id = parseInt(req.params.id);
    console.log(req.params.id);
    const data = await client.execute(query, [id], { hints: ["int"] });

    const user = data.rows[0];
   
    console.log(req.body);

    await userMapper.update({
      id: id,
     age:req.body.age||"none",
      blood:req.body.blood||"none",
      gender:req.body.gender||"none",
      policy:req.body.policy||"none",
      policyno:req.body.policyno||"none"

    });
    res.status(200).json({ message: "sucessful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});


router.put("/updatepassword/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM user WHERE id=? ALLOW FILTERING";
    const id = parseInt(req.params.id);
    console.log(req.params.id);
    const data = await client.execute(query, [id], { hints: ["int"] });

    const user = data.rows[0];
    const validated = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!validated) {
      res.status(401).json({
        errormessage: "Invalid Old Password",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.newpassword, salt);

      console.log(req.body);

      await userMapper.update({
        id: id,
        email: user.email,
        password: hashedPass,
      });

      res.status(200).json({ message: "sucessful" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

router.post("/doc/signup", async (req, res) => {
  try {
    const query = "SELECT * FROM doctor WHERE email=? ALLOW FILTERING";

    const data = await client.execute(query, [req.body.email]);

    const validate = data.rows[0];
    if (validate) {
      res.status(401).json({ message: "email already exist" });
    } else {
      const rw = await userMapper.findAll();

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const token = await bcrypt.hash(req.body.email + new Date(), salt);

      const data = await docMapper.insert({
        id: rw._rs.rowLength + 1,
        name: req.body.fullname,
        email: req.body.email,
        password: hashedPass,
       hospital: "none",
        education: "none",
        
      });
      res.status(200).json({ message: "sucessful" });
    }
  } catch (err) {
    res.status(500).json({ message: "somthing gone wrong " + err });
  }
});
router.post("/doc/signin", async (req, res) => {
  try {
    const query = "SELECT * FROM doctor WHERE email=? ALLOW FILTERING";
    const data = await client.execute(query, [req.body.email]);

    const user = data.rows[0];
    if (!user) {
      res.status(401).json({ message: "email not found" });
    } else {
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        res.status(401).json({
          message: "Invalid Password",
        });
      } else {
        const { password, ...others } = user;

        res.status(200).json(others);
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

router.get("/doc/getuserdetail/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM doctor WHERE id=? ALLOW FILTERING";
    const id = parseInt(req.params.id);
    console.log(req.params.id);
    const data = await client.execute(query, [id], { hints: ["int"] });

    const user = data.rows[0];
    if (!user) res.status(200).json({ message: "no user details avaliable" });
    else {
      const { password, ...others } = user;

      res.status(200).json({ message: others });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

router.put("/doc/updateuser/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM doctor WHERE id=? ALLOW FILTERING";
    const id = parseInt(req.params.id);
    console.log(req.params.id);
    const data = await client.execute(query, [id], { hints: ["int"] });

    const user = data.rows[0];

    console.log(req.body);

    await docMapper.update({
      id: id,
      hospital:req.body.hospital||"none",
      education:req.body.education||"none"
    });
    res.status(200).json({ message: "sucessful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

module.exports=router;
