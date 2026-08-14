const express = require("express");
const router = express.Router();
const recipeController = require("../controller/recipe.controls");

router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getOneRecipe);
router.post("/", recipeController.createRecipe);


module.exports = router;