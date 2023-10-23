const express = require('express');

const server = express();

const mongoose = require('mongoose');

const routes = require('./routes/car');

const cors = require("cors");

server.use(cors());
server.options("*", cors());

server.use(express.json()); // Autorise la réception de data en JSON

server.listen(5500, () => {
    console.log("Serveur lancé et écoute sur le port 5500");

    mongoose.connect("mongodb://localhost:27017/car");

    const db = mongoose.connection;

    db.once("open", () => console.log("Connexion au serveur MongoDB et à la base test OK !"))
      .on("error", error => console.error("oupsi ça a crash", error));
})

routes(server);

