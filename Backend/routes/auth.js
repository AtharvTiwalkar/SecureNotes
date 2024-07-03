const express=require('express');
const bcrypt = require('bcryptjs');//for encryption of the password 
const jwt = require('jsonwebtoken');//for jwt token
const router=express.Router();
const User=require('../models/User')
const {body,validationResult}= require("express-validator"); 

const JWT_SECRET ="Atharv-secret"

//Creat user using: POST "/api/auth/createuser". No login require

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
    //always use try catch we never what can happen 
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
      res.status(500).json({error:"Some error occured "})
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

module.exports=router