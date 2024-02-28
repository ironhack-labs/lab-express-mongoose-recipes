const mongoose = require("mongoose");
const {Schema , model } = mongoose

const recipeSchema = new Schema({
    title: {type: String, required: true, unique:true },
    instructions: {type: String, required: true},
    level: {type: String, enum: ["Easy Peasy","Amateur Chef","UltraPro Chef"]},
    ingredients: {type: [String]},
    image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg" },
    duration: {type: String, min:0 },
    isArchived: {type: String, default: false },
    created: {type: String, default: Date.now() }
})

module.exports = model("Recipe", recipeSchema)