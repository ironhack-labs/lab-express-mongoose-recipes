const express = require("express");
const logger = require("morgan");
const mongoose=require("mongoose")
const app = express();
const Recipe=require("./models/Recipe.model")

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URL = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose.connect(MONGODB_URL)
.then(x=>console.log(`Connnected to Mongo ! Database name:"${x.connections[0].name}"`))
.catch((err)=>console.error("Error connecting to mongo",err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

app.post('/recipes',(req,res)=>{
  Recipe.create({
     title : req.body.title,
    instructions:req.body.instructions,
    level:req.body.level,
    ingredients :req.body.ingredients,
    image:req.body.image,
    duration:req.body.duration,
    isArchived:req.body.isArchived,
    created:req.body.created
   }
  )
  .then((createRecipe)=>{res.status(201).json(createRecipe);})
  .catch((err)=>{res.status(500).json({message:"Error when created a new recipe"})})
}
)

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get(('/recipes'),(req,res)=>{
    Recipe.find()
    .then((recipes)=>{
        console.log("Here is all those recepis",recipes);
        res.status(200).json(recipes);
    }

    )
    .catch((err)=>{console.error(err);res.status(500).json({errorMessage:"Problems finding those recepis"})})
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get(('/recipes/:recipeId'),(req,res)=>{
    const {recipeId}=req.params;
    Recipe.findById(recipeId)
    .then((recipe)=>{
        console.log("Here is the recepe you need",recipe);
        res.status(200).json(recipe);
    }
    )
    .catch((err)=>{console.error(err);res.status(500).json({errorMessage:"Problems finding those recepe"})})
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put(('/recipes/:recipeId'),(req,res)=>{
    const {recipeId}=req.params;
    Recipe.findByIdAndUpdate(recipeId,req.body,{new:true})
    .then((updateRecipe)=>{
        
        res.status(200).json(updateRecipe);
    }
    )
    .catch((err)=>{console.error(err);res.status(500).json({errorMessage:"Problems update a recepe"})})
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete(('/recipes/:recipeId'),(req,res)=>{
    const {recipeId}=req.params;
    Recipe.findByIdAndDelete(recipeId)
    .then(()=>{
        
        res.status(204).send();
    }
    )
    .catch((err)=>{console.error(err);res.status(500).json({errorMessage:"Problems update a recepe"})})
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
