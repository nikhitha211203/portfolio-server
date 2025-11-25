const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
//  MongoDB Connect
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Error:", err));


// ===============================
//  Test Route (GET)
// ===============================
app.get("/", (req, res) => {
  res.send("Portfolio Server is Running ✔");
});

// Check API route
app.get("/api/contact", (req, res) => {
  res.send("Contact API Working ✔ (POST method required)");
});


// ===============================
//  Contact API Route (POST)
// ===============================
app.post("/api/contact", async (req, res) => {
  try {
    const contactData = new Contact(req.body);
    await contactData.save();

    res.status(200).json({
      success: true,
      message: "Message Saved Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving message!",
      error: error.message,
    });
  }
});


// ===============================
//  Start Server
// ===============================
// Use Render PORT or local 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
