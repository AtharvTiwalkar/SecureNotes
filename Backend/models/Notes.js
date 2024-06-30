import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title:{
        type:string,
        reqired:true
    },
    description:{
        type:string,
        required:true,
    },
    tag:{
        type:string,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }

});

modules.exports=mongoose.model('notes',NotesSchema)