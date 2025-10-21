const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Recipe = require("./models/Recipe.model");
const bodyParser = require("body-parser");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());



// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    const body = req.body;
    res.json(body);
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    const body = req.body;
    Recipe.create(body)
    .then(res => res.status(201).json(body))
    .catch(err => res.status(500).json({ error: err}));
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({ error: err}));
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Recipe.findByIdAndUpdate(id, body)
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({ error: err}));
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
    .then(res => res.status(204).json(res))
    .catch(err => res.status(500).json({ error: err}));
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
