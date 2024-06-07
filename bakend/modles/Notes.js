const mongoose=require("mongoose");
const user = require("./User");
const { Schema } = mongoose;


const NoteSchema = new Schema({
   user:{
type:mongoose.Schema.Types.ObjectId,
ref:'user'
   },
 title:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true,
   
 },
 tag:{
    type:String,
   default:"General"

 },
 img:{
   type:String,
 }
 
  });
 const Note= mongoose.model('note',NoteSchema)
  module.exports=Note;