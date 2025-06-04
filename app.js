
const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB

const mongoose = require("mongoose");

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
app.post("/recipes", (req, res) => {
  //Como probamos ruta
 //console.log("ruta bien, todo OK")

    //como recibimos la data para crear artista: a través del body
  //console.log(req.body)

  //como le pedmimos a la db que cree el artista: con Model => Artist, dentro en los parentesis definimos el objeto para controlar qué se permite, lo hacemos con el req.body.(lo q sea)
  //Podemos utilizar destructuracion y reduccion de declaracion de objetos.
  Artist.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
  .then ((createdRecipe) => {
    //si el código llega aquí significa que el documento se creo corrrectamente
   res.status(201).json(createdRecipe);
  })
  .catch((error) => {
    res.status(500).json({ message: "error while creating a new recipe"});
  })

})
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Error getting all recipes" });
    });
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "error getting a single recipe" });
    });
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((updatedRecipe) => {
    res.status(200).json(updatedRecipe);
  })
  .catch((error) => {
     res.status(500).json({ message: "Error updating the recipe" });
  });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Error deleting the recipe" });
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
