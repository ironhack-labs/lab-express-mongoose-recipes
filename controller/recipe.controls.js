const Recipe = require('../models/Recipe.model')


module.exports = {
  getAllRecipes: (req, res) => {
    Recipe.find()
      .then(recipes => res.status(200).json(recipes))
      .catch(err => res.status(500).json(err))
  },


getOneRecipe: (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).json(err))
}, 

createRecipe: (req, res) => {
  Recipe.create(req.body)
    .then(recipes => res.status(201).res.json(recipes)
  )
  .catch((err)=>{console.log(err); 
  res.status(500).json(err)}
  )
},

updateOneRecipe: (req, res) =>{
const { id } = req.params.id;
Recipe.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  .then(recipes => {res.status(200).json(recipes)})
  .catch(err => res.status(500).json(err))

},

deleteRecipe: (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(recipes => res.status(204).json(recipes))
    .catch(err => res.status(500).json(err))
}

}