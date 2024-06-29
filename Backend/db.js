const mongoose =require('mongoose');
const mongoURI ='mongodb://localhost:27017/'

const connectToMongo= async()=>{
    await mongoose.connect(mongoURI, console.log("connected to mongoose successfully"))
}
//command paltted toggle word wrap is used to stop text overflow 

module.exports=connectToMongo;