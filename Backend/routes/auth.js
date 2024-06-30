const express=require('express');
const router=express.Router();
const User=require('../models/User')



//Creat user using: POST "/api/auth/". Doesn't require Auth 
router.post('/',(req,res)=>{//try to use post get is not secure
    // obj={    
    //     name:"atharv"
    // }
    // res.json(obj);
    console.log(req.body);
    const user =User(req.body);
    user.save();
    // res.send("hello")
    res.send(req.body)
    
    // res.json([]);
})

module.exports=router