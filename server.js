require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "mon_portfolio")));

// app.use("/images", express.static(path.join(__dirname, 'images')));
// app.use("/css", express.static(path.join(__dirname, 'css')));
// app.use("/font", express.static(path.join(__dirname, 'font')));
// app.use("/js", express.static(path.join(__dirname, 'js')));
// app.use("/sass", express.static(path.join(__dirname, 'sass')));
// Middleware
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
// Connexion à MongoDB
mongoose
.connect("mongodb+srv://user:0000@cluster0.dchqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { 
 
})

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Modèle MongoDB
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormData = mongoose.model("FormData", FormDataSchema);

// Route pour télécharger le fichier CV
app.get("/download-cv", (req, res) => {
  const filePath = path.join(__dirname, "cv.pdf");
  res.download(filePath, "cv.pdf", (err) => {
      if (err) {
          console.error("Erreur lors du téléchargement du fichier :", err);
          res.status(500).send("Erreur lors du téléchargement du fichier.");
      }
  });
});
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });
app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newEntry = new FormData({ name, email, message });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Merci de nous avoir contacté." });
} catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data", error });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
