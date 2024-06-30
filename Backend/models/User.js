const { default: mongoose } = require("mongoose");//SyntaxError: Cannot use import statement outside a module


const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});

const User=mongoose.model('user',UserSchema)
User.createIndexes()
module.exports=User;