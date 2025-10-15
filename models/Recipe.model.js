import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  title: String,
  instructions: String,
  level: String,
  ingredients: [String],
  image: String,
  duration: Number,
  isArchived: Boolean,
  created: { type: Date, default: Date.now },
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
