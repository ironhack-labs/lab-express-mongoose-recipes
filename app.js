const express = require("express");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");


const app = express();


// Permet de lire les données JSON envoyées par le client
app.use(express.json());



// ===============================
// CONNEXION MONGODB
// ITERATION 1
// ===============================

const MONGODB_URI =
  "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";


mongoose
  .connect(MONGODB_URI)

  .then((x) => {

    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

  })

  .catch((err) => {

    console.error("Error connecting to mongo", err);

  });




// ===============================
// CREATE A RECIPE
// ITERATION 3
// POST /recipes
// ===============================

app.post("/recipes", (req, res) => {


  Recipe.create(req.body)


    .then((recipe) => {


      res.status(201).json(recipe);


    })


    .catch((err) => {


      res.status(500).json(err);


    });


});




// ===============================
// GET ALL RECIPES
// ITERATION 4
// GET /recipes
// ===============================

app.get("/recipes", (req, res) => {


  Recipe.find()


    .then((recipes) => {


      res.json(recipes);


    })


    .catch((err) => {


      res.status(500).json(err);


    });


});




// ===============================
// GET SINGLE RECIPE
// ITERATION 5
// GET /recipes/:id
// ===============================

app.get("/recipes/:id", (req, res) => {


  Recipe.findById(req.params.id)


    .then((recipe) => {


      res.json(recipe);


    })


    .catch((err) => {


      res.status(500).json(err);


    });


});




// ===============================
// UPDATE SINGLE RECIPE
// ITERATION 6
// PUT /recipes/:id
// ===============================

app.put("/recipes/:id", (req, res) => {


  Recipe.findByIdAndUpdate(

    req.params.id,

    req.body,

    {
      new: true
    }

  )


    .then((updatedRecipe) => {


      res.json(updatedRecipe);


    })


    .catch((err) => {


      res.status(500).json(err);


    });


});




// ===============================
// DELETE SINGLE RECIPE
// ITERATION 7
// DELETE /recipes/:id
// ===============================

app.delete("/recipes/:id", (req, res) => {


  Recipe.findByIdAndDelete(req.params.id)


    .then((deletedRecipe) => {


      res.json(deletedRecipe);


    })


    .catch((err) => {


      res.status(500).json(err);


    });


});




// ===============================
// START SERVER
// ===============================

const PORT = 3000;


app.listen(PORT, () => {


  console.log(`Server listening on port ${PORT}`);


});