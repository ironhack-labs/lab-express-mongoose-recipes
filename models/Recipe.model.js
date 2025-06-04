// Your code here ...
const mongoose = require("mongoose")


// creo el Schema 
const recipeSchema = new mongoose.Schema({
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
    isArchived:{
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})


// creo el modelo
const Recipe = mongoose.model("Recipe", recipeSchema)

//exporto el modelo
module.exports = Recipe