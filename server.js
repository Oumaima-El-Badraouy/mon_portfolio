require("dotenv").config();
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


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
app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }


    res.status(201).json({ success: true, message: "Merci de nous avoir contacté." });
} catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data", error });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
