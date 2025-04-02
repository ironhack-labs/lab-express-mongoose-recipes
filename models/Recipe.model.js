// Your code here ...
//import Schema and model from mongoose
const { Schema, model } = require("mongoose");

//create a new ()Class)-Schema (modèle) for the recipes and define the shape of the model 
const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    instructions: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {
        type: [String]
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
})
// and then we create the modele for real (up define now create the model)
const RecipeModel = model("recipe", recipeSchema);
// don't forget to export(s) it!!!!
module.exports = RecipeModel;