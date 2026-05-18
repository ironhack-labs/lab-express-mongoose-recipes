// Your code here ...
const mongoose = require("mongoose")
const Schema = mongoose.Schema


//schema
const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    instructions: {type: String, required: true},
    level: {type: String, wink: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: {type: [String], },
    image: {type: String, default: "https://images.media-allreceipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    isArchived: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}

})

//model
const Recipe = mongoose.model("Recipe", recipeSchema);
//export model
module.exports = Recipe