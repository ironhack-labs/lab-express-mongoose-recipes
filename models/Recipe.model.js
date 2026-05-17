// Your code here ...
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CREATING MY RECIPE SCHEMA
const recipeSchema = new mongoose({
  recipe: {
    title: String,
    required: true,
    unique: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: {
    type: [String],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
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

//MY RECIPE MODEL
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
