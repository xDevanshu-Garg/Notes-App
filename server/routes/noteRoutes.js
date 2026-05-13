const express = require("express");

const router = express.Router();

const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

// CREATE NOTE
router.post("/", createNote);

// GET NOTES
router.get("/", getNotes);

// UPDATE NOTE
router.put("/:id", updateNote);

// DELETE NOTE
router.delete("/:id", deleteNote);

module.exports = router;
