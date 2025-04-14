const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    const notes = await Notes.find({ user: userId });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "Description must be at least 5 characters long"
    ).isLength({ min: 5 }),
    body("tag", "Tag must be at least 3 characters long").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const userId = req.user.id;
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: userId,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const noteId = req.params.id;
  const userId = req.user.id;
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

  const note = await Notes.findById(noteId);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== userId) {
    return res.status(401).send("Not Allowed");
  }

  try {
    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { $set: newNote },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  const note = await Notes.findById(noteId);
  try {
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== userId) {
      return res.status(401).send("Not Allowed");
    }

    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).send("Not Found");
    }
    res.json({ Success: "Note has been deleted", note: deletedNote });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
