// Your code here ...

const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const recipeSchame = new Schema({
title: {type:String, required: true},
instructions: {type:String, required: true} ,
level: {type:String , enum:["_Easy Peasy_","_Amateur Chef_","_UltraPro Chef_"]},
ingredients: {type:[String]},
image: {type:String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
duration: {type:Number, min:0},
isArchived: {type:Boolean, default:false},
created: {type:Date, default:Date.now}


})

module.exports = mongoose.model('Recipe', recipeSchame)