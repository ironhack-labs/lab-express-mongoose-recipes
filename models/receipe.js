const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  title: {
    type: String,
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
  ingredients: [String],

  Image: {
    String,
    Default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 10,
  },

  isArchived: {
    type: Boolean,
    defaut: false,
  },
  created: {
    type: Date,
    defaut: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;