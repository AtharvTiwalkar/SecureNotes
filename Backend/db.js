require('dotenv').config()
const mongoose =require('mongoose');
const mongoURI =process.env.MONGODB_URI

const connectToMongo= async()=>{
    await mongoose.connect(mongoURI, console.log("connected to mongoose successfully"))
}
//command paltted toggle word wrap is used to stop text overflow 

module.exports=connectToMongo;