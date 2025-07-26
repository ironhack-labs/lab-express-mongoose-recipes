const express = require("express");
const logger = require("morgan");

const Recipe = require("./models/Recipe.model");

const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
.connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
	.then(() => console.info("Connected to express-mongoose-recipes-dev database!"))
	.catch(() => console.error("Error connecting to the mongo database!", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) => {
	Recipe.create(req.body)
		.then((recipe) => {
			res.status(201).json(recipe);
		})
		.catch((error)=> {
			res.status(500).json({ message: "Error while creating recipe" });
		});
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
	Recipe.find()
		.then((recipes) => {
			res.status(200).json(recipes);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error listing recipes" });
		});
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {
	Recipe.findById(req.params.id)
		.then((recipe) => {
			res.status(200).json(recipe);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error finding the recipe" });
		});
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
	Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((recipe) => {
			res.status(200).json(recipe);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error updating the recipe" });
		});
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res, next) => {
	Recipe.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).send();
		})
		.catch((error) => {
			res.status(500).json({ message: "Error updating the recipe" });
		});
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
