const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

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

// Route pour gérer le formulaire de contact
app.post("/submit-form", (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Tous les champs sont requis." });
    }

    console.log("📩 Nouveau message reçu :", { name, email, message });

    res.status(200).json({ success: true, message: "Merci de nous avoir contacté !" });
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire :", error);
    res.status(500).json({ success: false, message: "Erreur lors de la soumission du formulaire." });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
