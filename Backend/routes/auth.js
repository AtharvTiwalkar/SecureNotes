const express=require('express');
const router=express.Router()

router.get('/',(req,res)=>{
    // obj={
    //     name:"atharv"
    // }
    // res.json(obj);
    res.json([]);
})

module.exports=router