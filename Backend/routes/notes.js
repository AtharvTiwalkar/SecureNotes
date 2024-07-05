const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes using: Get "/api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }

  // obj={
  //     name:"atharv"
  // }
  // res.json(obj);
});

//Route 2: Add a new note using: POST "/api/notes/addnote".Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description ").isLength({ min: 5 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      //If there are errors return bad requests
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error ");
    }
  }
);

//Route 3: Update a new note using: POST "/api/notes/updatenote".Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //Create newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  //Find the note to be updated and update it 
  let note=await Note.findById(req.params.id)
  if(!note){
    return res.status(404).send("Not found")
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not allowed")
  }
  note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});

});
module.exports = router;
