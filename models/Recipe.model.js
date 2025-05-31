const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "No name, no game"],
      unique: true
    },
    instructions: {
      type: String,
      required: [true, "Can't cook without 'em"]
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {
      type:[String]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
      type: Number,
      min: 0
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    created: {
      type: Date,
      default: Date.now
    }
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;