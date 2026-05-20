const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    /\.vercel\.app$/
  ],
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
