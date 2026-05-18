const express = require("express");
const { default: mongoose } = require("mongoose");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model");

const app = express();
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
    .connect(MONGODB_URI)
    .then((x) => 
    console.log(`connected to Mongo!: "${x.connections[0].name}"`))
    .catch((err) => 
    console.log("error connecting to mongo", err))


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});



//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {

    //new recipe using the data from req.body
    Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
    })
    .then((createdRecipe) => {
        res.status(201).json(createdRecipe)
    })
    .catch((err) => {
        res.status(500).json({message: "Error creating a new recipe"})
    })
    })


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get(`/recipes`, (req, res) => {

    //get all recipes for the db
    Recipe.find()
    .then((allRecipes) => {
        //respond with the status code 200
        res.status(200).json(allRecipes)
    })
    //respond with the status code 500
    .catch((err) => {
        res.status(500).json({message: "Error while getting all recipes"})

    })
    })

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get(`/recipes/:id`, (req, res) => {

    //get a single recipe for the db using the query param "id" from the url
    Recipe.findById(req.params.id)
    .then((recipe) => {
        //respond with the status code 200
        res.status(200).json(recipe)
    })
    //respond with the status code 500
    .catch((err) => {
        res.status(500).json({message: "Error while getting a single recipe"})
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put(`/recipes/:id`, (req, res) => {
    
    //update a single recipe for the db using the query param "id" from the req.body
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedRecipe) => {
        //respond with the status code 200
        res.status(200).json(updatedRecipe)
    })
    //respond with the status code 500
    .catch((err) => {
        res.status(500).json({message: "Error while updating a single recipe"})
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete(`/recipes/:id`, (req, res) => {
    
    //delete a single recipe for the db using the query param "id" from the url
    Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe) => {
        //respond with the status code 204
        res.status(204).send(deletedRecipe)
    })
    //respond with the status code 500
    .catch((err) => {
        res.status(500).json({message: "Error while deleting a single recipe"})
    })
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
