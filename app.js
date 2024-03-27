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
	.then((x) =>
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	)
	.catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
	res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
	Recipe.create(req.body)
		.then((createdRecipe) => {
			console.log(createdRecipe);
			res.status(201).json(createdRecipe);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Error, recipe not included" });
		});
});

//  Iteration 4 - Get All Recipes//  GET  /recipes route

app.get("/recipes", (req, res) => {
	Recipe.find()
		.then((allRecipes) => {
			res.status(200).json(allRecipes);
		})
		.catch((err) => {
			res.status(500).json({ message: "Error, recipes won't be shown" });
		});
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
	const params = req.params;
	const id = params.id;
	Recipe.findById(id)
		.then((oneRecipe) => {
			res.status(200).json(oneRecipe);
		})
		.catch((err) => {
			res.status(500).json({ message: "Error, recipe won't be shown" });
		});
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
	const params = req.params;
	const id = params.id;
	Recipe.findByIdAndUpdate(id, req.body, { new: true })
		.then((updatedRecipe) => {
			res.status(200).json(updatedRecipe);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error updating recipe" });
		});
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
	const params = req.params;
	const id = params.id;
	Recipe.findByIdAndDelete(id)
		.then(() => {
			res.status(204).send();
		})
		.catch((error) => {
			res.status(500).json({ message: "Error deleting recipe" });
		});
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
