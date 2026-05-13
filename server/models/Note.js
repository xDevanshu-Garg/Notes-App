const mongoose = require("mongoose");

// Schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // Mongoose automatically adds:createdAt, updatedAt
  },
);

module.exports = mongoose.model("Note", noteSchema);
// Schema = design, Model = usable object, Note.create(), Note.find(), Note.deleteOne()
