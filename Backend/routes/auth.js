const express=require('express');
const bcrypt = require('bcryptjs');//for encryption of the password 
const jwt = require('jsonwebtoken');//for jwt token
const router=express.Router();
const User=require('../models/User')
const {body,validationResult}= require("express-validator"); 
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET ="Atharv-secret"

//ROUTE 1: Create user using: POST "/api/auth/createuser". No login require

router.post('/createuser',[//try to use post get is not secure
    body('name').isLength({min:5}),
    body('email').isEmail(),
    body('password').isLength({min:5})],
    
    async (req,res)=>{
    const errors=validationResult(req);

    //If there are errors return bad requests 
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    //Check for the duplicate email
    //always use try catch we never know what can happen 
    try{
    let user=await User.findOne({email:req.body.email});
    
    if(user){
        return res.status(400).json({error:"Sorry user with this email is already exists"})
    }

    const salt=await bcrypt.genSalt(10)//seek for npm package information for reference
    const secPass=await bcrypt.hash(req.body.password,salt);//await since it return promise  
    //create new user 
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass //req.body.password,
      })
    
    const data={
      user:{
        id:user.id
      }
    }
    //hovering on the method or function we get know about sync or async nature
    const authtoken=jwt.sign(data,JWT_SECRET);//adding sign to the data means signing the data
    res.json({authtoken:authtoken})

    }catch(error){
      console.error(error.message);
      res.status(500).send({error:"Some error occured "})
    }
  
    //     .then((user) => res.json(user))
    //     .catch((err) => {
    //       console.log(err);
    //       res.json({ error: "Enter a unique value", message: err.message });
    // });

    // const user= new  User(req.body);
    // obj={    
    //     name:"atharv"
    // }
    // res.json(obj);
    // console.log(req.body);
    // const user =User(req.body);
    // user.save();
    // res.send("hello")
    // res.send(req.body)
    
    // res.json([]);
    


})

//ROUTE 2: Authenticate user using : POST "/api/auth/login" . No login required 
router.post('/login',

  [
    body('email').isEmail(),
    body('password').exists()
  ],

  async(req,res)=>{

    const errors=validationResult(req);

    //If there are errors return bad requests 
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    const {email,password}= req.body;
    try{
      const user=await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please enter valid credential"})//always try to hide what happened in backed work 
      }
      const passwordCompare= await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Please enter valid credential"})
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      res.json({authtoken:authtoken})
    
    }catch(error){
      console.error(error.message)
      res.status(500).send({error:"Internal server error "})
    }
  }
  )

//ROUTE 3:Get logged in user detail using : POST "/api/auth/getuser". Login required 

router.post('/getuser',fetchuser,
  async(req,res)=>{
    try{
      userId=req.user.id;
      const user=await User.findById(userId).select("-password");
      res.send(user)
    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
  }
)

module.exports=router