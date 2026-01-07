const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// ❗️ ITERATION 1 - Connect to MongoDB
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// Importar las rutas de recetas
const recipesRoutes = require("./routes/recipes.routes");
app.use("/", recipesRoutes);  // Todas las rutas de recetas estarán en /recipes, /recipes/:id, etc.

// ROUTES
// GET / route - Página de bienvenida
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// Las rutas específicas de recetas (POST, GET, PUT, DELETE) ya están definidas
// en el archivo ./routes/recipes.routes.js y montadas arriba con app.use("/")

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

// ❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;