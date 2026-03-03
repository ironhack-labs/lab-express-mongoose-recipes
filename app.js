const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");
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
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) =>{
    try {
        const createdRecipe = await RecipeModel.create(req.body)
        res.status(201).json(createdRecipe)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res)=>{
try {
    const allRecipes = await RecipeModel.find()
     res.status(200).json(allRecipes)
} catch (error) {
   console.log(error)
    res.status(500).json(error) 
}
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("recipes/:id", async (req, res)=> {
    const {recipeId} = req.params
    try {
    const findOneRecipe = await RecipeModel.findById(recipeId)
    res.status(200).json(findOneRecipe)
    } catch (error) {
      console.log(error)
    res.status(500).json(error)   
    }
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res)=>{
    RecipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe)=>{
    res.status(200).json(updatedRecipe)
    })
    .catch((err)=>{
    res.status(500).json(err)
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.put("/recipes/:id", (req, res)=>{
    RecipeModel.findByIdAndDelete(req.params.id)
    .then((deletedRecipe)=>{
    res.status(200).json(deletedRecipe)
    })
    .catch((err)=>{
    res.status(500).json(err)
    })
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
