const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config/config.js");

const app = express();

app.use(bodyParser.json());

mongoose.connect(config.mongodb.url, config.mongodb.options)
  .then(() => {
    console.log("Connexion à MongoDB réussie");
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB:", error);
  });
