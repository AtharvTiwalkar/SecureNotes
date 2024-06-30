import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:string,
        reqired:true
    },
    email:{
        type:string,
        required:true,
        unique:true
    },
    password:{
        type:string,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});

modules.exports=mongoose.model('user',UserSchema)