const express = require('express');
const User = require('../modles/User');
const router = express.Router()
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';
var fetchuser=require("../middleware/fetchuser")




//   Route1:Create a user using :POST  "api/auth/createuser". no logn require
router.post('/createuser', [
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password must be at least 3qww character').isLength({ min: 3 }),
], async (req, res) => {
  let success=false;
  // if there are error return bad error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  } //check eheather a user with this emial exixts already
  try {


    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success,Error: "The user with this email is already exists" })
    }
    console.log(user)
    const salt=await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    //   .then(user=>res.json(user)).catch(err=>{console.log(err)
    // res.json({error:"plase enter a unque value for email" ,message:err.message})})
    // res.send(req.body)
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    // res.json(user)
    success=true;
    res.json({success,authtoken})
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }


});


//Route1:Authenticate a user using :POST  "api/auth/login". no logn require

router.post('/login', [
 
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  let success=false;
  // if there are error return bad error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body;
  try {
    let user=await User.findOne({email})
    if(!user)
    {
      res.status(400).json({error:"plz try to login current credential"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
      success=false;
      res.status(400).json({success,error:"plz try to login current credential"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    // res.json(user)
    res.json({success,authtoken})
    // var a=authtoken;
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
    }
})
  
//Route3:Authenticate a user using :POST  "api/auth/login". no logn require
router.post('/getuser', fetchuser, async (req, res) => {
 
try {
  const userId=req.user.id;
  const user=await User.findById(userId).select("-password");
  res.send(user);

  
} catch (error) {
  console.error(error.message);
    res.status(500).send("Internal server Error");
  
}
})



module.exports = router