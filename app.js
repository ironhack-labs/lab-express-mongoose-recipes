const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const recipeRoutes = require("./routes/recipe.routes.js")
require("dotenv").config();


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());




// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/recipes";


mongoose.connect(MongoDB    
).then((x)=>{ console.log(`Connected to Mongo! Database : "${x.connections[0].name}"`)}).catch(err => console.error("Error connection to the database", Error) )



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.use("/recipes", recipeRoutes)
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
// the routes have been refactored in the routes folder

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
/* the routes have been refactored in the routes folder
 */
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
/* the routes have been refactored in the routes folder
 */
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
/* the routes have been refactored in the routes folder
 */

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
