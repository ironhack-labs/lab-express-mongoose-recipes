const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/one-recipe/:recipeID', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.get('/create-a-recipe',(req, res) => {
    Recipe.create(req.body)
    .them((data) => {
        console.log("recipe added", data);
        res.status(201).json(data);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json({errorMessage: err});
    });
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req,res) =>{
    try {
        const data = await Recipe.fing();
        console.log("Recipe found");
        res.status(200).json(data);
    }catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: err});
    }
})
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/one-recipe/:recipeID', async (req, res) => {
    try{
        const foundOneRecipe = await Recipe.findById(req.params.recipeID);
        console.log("Recipe found", foundOneRecipe);
        res.status(200).json(foundOneRecipe);
    }catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: err});
    }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/update-recipe/:recipeID", (req, res) => {
  const { recipeID } = req.params;

  Recipes.findByIdAndUpdate(recipeID, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Recipe Updated", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/delete-recipe/:recipeID", (req, res) => {
  Recipe.findByIdAndDelete(req.params.recipeID)
    .then((data) => {
      console.log("Recipe deleted", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
