const express = require("express");
const logger = require("morgan");

const app = express();

// import the RecipeModel to use it here
const RecipeModel = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoose = require("mongoose");

// app.js

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
app.post("/recipes", async (req, res) => {
    RecipeModel.create(req.body)
    .then((createdRecipe) => {
        // 201 = successfully created
        res.status(201).json(createdRecipe);
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({ errorMessage: "UH OH - problem creating your recipe" });
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res)=> {
    RecipeModel.find()
    .then((allRecipes)=> {
        // 200 = OK
        res.status(200).json(allRecipes);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: "UH oh - problem getting all the recipes" });
    });
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res)=> {

    const { recipeId } = req.params;
    RecipeModel.findById(recipeId)
    .then((oneRecipe)=> {
        res.status(200).json(oneRecipe);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: "UH oh - problem getting the recipe with the id of ... " });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res)=> {
    try {
        const { recipeId } = req.params;
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, req.body);
        console.log("here is the updated recipe: ", updatedRecipe);
        res.status(200).json(updatedRecipe)
    }
    catch (err){
        console.log(err);
        res.status(500).json({ errorMessage: "UH oh - problem updating the recipe with the id of ... " });
}
//.then((updatedRecipe) => {
    // res.status(200).json(updatedRecipe)
    //})
    //.catch (err) => {
        //res.status(500).json({ errorMessage: "UH oh - problem updating the recipe with the id of ... " })}
})    

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("recipes/:id", (req, res)=>{
    const { recipeId } = req.params;

    RecipeModel.findByIdAndDelete(recipeId)
    .then((deletedRecipe) => {
        console.log("here is the deleted recipe", deletedRecipe);
        //no content deleted?
        res.status(204).json(deletedRecipe)
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({ errorMessage: "UH oh - problem deleting the recipe with the id of ... "})
    })
});



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
