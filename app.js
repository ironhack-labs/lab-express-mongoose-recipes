const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Mongo connect
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

// routes
const recipesRouter = require("./routes/recipes.routes");
app.use("/api", recipesRouter);

// root
app.get("/", (_req, res) => res.send("Recipes API up"));

// listen (only here)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
