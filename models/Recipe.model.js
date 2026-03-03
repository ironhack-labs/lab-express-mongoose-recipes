const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recipeSchema = new Schema(

// isArchived - Type Boolean. The default value should be false.
// created - Type Date. By default, today.
  {
    title: {
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
      type: [String],
    },
    image: {
        type: String, 
        default: "https://images.media-allrecipes.com/images/75131.jpg"
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
        default: Date.now()
    }
  }
);

const RecipeModel = model("Recipe", recipeSchema);

module.exports = RecipeModel;