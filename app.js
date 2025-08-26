const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
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



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    try {
      const newRecipe = await Recipe.create(req.body);
      res.status(201).json(newRecipe); // Send back the created recipe
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    try {
      const recipes = await Recipe.find(); // Fetch all recipes
      res.status(200).json(recipes);       // Respond with recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });  

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findById(id);
  
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      res.status(200).json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
        new: true,        // return the updated document
        runValidators: true // ensure schema validation
      });
  
      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
  
      if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      // 204 No Content -> successful deletion, no response body
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
