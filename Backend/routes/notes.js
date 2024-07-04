const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes using: Get "/api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error ")
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
    try{
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
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error ")
    }
  }
);

module.exports = router;
