const express=require('express');
const router=express.Router();
const User=require('../models/User')
const {body,validationResult}= require("express-validator"); 



//Creat user using: POST "/api/auth/". Doesn't require Auth 

router.post('/',[//try to use post get is not secure
    body('name').isLength({min:5}),
    body('email').isEmail(),
    body('password').isLength({min:5})],(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          res.json({ error: "Enter a unique value", message: err.message });
    });
    
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