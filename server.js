require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
.connect("mongodb://localhost:27017/comments")

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Modèle MongoDB
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormData = mongoose.model("FormData", FormDataSchema);
app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newEntry = new FormData({ name, email, message });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Data saved!" });
} catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data", error });
}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
