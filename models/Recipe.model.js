// Your code here ...
const mongoose = require("mongoose");

// schema
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: {
    type: [String], // an array of strings
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// model
const Artist = mongoose.model("Artist", artistSchema);
// argument 1: the internal name of the model. Always singular and Pascal Casing.

module.exports = Artist;
