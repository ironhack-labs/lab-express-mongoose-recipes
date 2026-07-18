import express from "express";
import {
    createRecipe, getAllRecipes, getRecipeById, updateRecipeById, deleteRecipeById 

} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/create", createRecipe);
router.patch("/:id", updateRecipeById);
router.delete("/:id", deleteRecipeById);

export default router;