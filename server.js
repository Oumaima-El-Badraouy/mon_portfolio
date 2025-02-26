require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Servir les fichiers statiques (CSS, JS, Images, etc.)
app.use(express.static(path.join(__dirname, "public")));


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stockage temporaire des soumissions (simule une DB en mémoire)
let formSubmissions = [];

// 📥 Route pour soumettre le formulaire
app.post("/submit-form", (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Ajouter les données dans le tableau temporaire
    formSubmissions.push({ name, email, message });

    console.log("📩 Nouvelle soumission :", { name, email, message });

    // Réponse de succès avec message
    res.status(201).json({ success: true, message: `Merci ${name}, votre message a bien été reçu !` });

  } catch (error) {
    console.error("❌ Erreur :", error);
    res.status(500).json({ success: false, message: "Une erreur est survenue.", error });
  }
});

// 📄 Route pour télécharger le CV
app.get("/download-cv", (req, res) => {
  const filePath = path.join(__dirname, "cv.pdf");
  res.download(filePath, "cv.pdf", (err) => {
    if (err) {
      console.error("❌ Erreur lors du téléchargement du fichier :", err);
      res.status(500).send("Erreur lors du téléchargement du fichier.");
    }
  });
});

// 🎯 Route pour voir les soumissions (juste pour vérifier en dev)
app.get("/submissions", (req, res) => {
  res.json(formSubmissions);
});

// 🔥 Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
