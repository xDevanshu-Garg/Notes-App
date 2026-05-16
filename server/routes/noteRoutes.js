const express = require("express");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

// CREATE NOTE
router.post("/", protect, createNote);

// GET NOTES
router.get("/", protect, getNotes);

// UPDATE NOTE
router.put("/:id", protect, updateNote);

// DELETE NOTE
router.delete("/:id", protect, deleteNote);

module.exports = router;

/*
Request
   ↓
protect middleware
   ↓
JWT verification
   ↓
Route Controller
   ↓
Database
*/