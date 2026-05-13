/*
const express = require("express");

const app = express();

const PORT = 5000;

// Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start Server
app.listen(PORT, () => {
  {
    console.log(`Server running on port ${PORT}`);
  }
});
*/

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/notes", noteRoutes);

// Start Server
app.listen(PORT, () => {
  {
    console.log(`Server running on port ${PORT}`);
  }
});
