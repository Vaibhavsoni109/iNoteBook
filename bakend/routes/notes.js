const express = require('express')
const router = express.Router()
var fetchuser = require("../middleware/fetchuser")

const mongoose = require('mongoose');

const Notes = require('../modles/Notes');
const { body, validationResult } = require('express-validator');

//   Route1:get all the  note using :get  "api/auth/fetchallnotes". no logn require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.json(notes)
});
//Route2:add a new note  using :post  "api/auth/addnote".  login require
router.post('/addnote', fetchuser, [
  body('title', 'enter a valid title').isLength({ min: 3 }),
  body('description', 'descripion must be at least 5 character').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id

    })
    const saveNotes = await note.save();
    res.json(saveNotes)
    // const deletedNote = await Notes.findById("65a635d9535dd3c9c179e42c")
    // console.log(deletedNote);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
}
);


// Route3:delete a existing note  using :post  "api/auth/deletenote".  login require
router.post('/deletenote/:id', async (req, res) => {

 const noteId=req.params.id;
  try {
    // Find the existing note by ID and delete it
    const deletedNote = await Notes.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }


});

// Route4:update a existing note  using :Put  "api/auth/deletenote".  login require

router.put("/updatenote/:id",fetchuser,async(req,res)=>{
  let noteId=req.params.id;
  
  try {
    const {title,description,tag}=req.body;
    const newnote={};
    if(title){newnote.title=title}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}
    const note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if(note.user.toString()!==req.user.id)
    {
      return res.status(401).send("Not Allowed");
    }
 const  updatenote=await Notes.findByIdAndUpdate(noteId,{$set:newnote},{new:true})
  res.json(updatenote);


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})


module.exports = router