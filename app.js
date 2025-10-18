const express = require("express");
const logger = require("morgan");
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
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
    try {
      const doc = await Recipe.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (_req, res) => {
    try {
      const list = await Recipe.find().sort({ created: -1 });
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
    try {
      const { id } = req.params;
        const doc = await Recipe.findById(id);
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
    try {
      const { id } = req.params;
       const doc = await Recipe.findByIdAndUpdate(id, req.body);
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: 'Invalid id' });
      const doc = await Recipe.findByIdAndDelete(id);
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
