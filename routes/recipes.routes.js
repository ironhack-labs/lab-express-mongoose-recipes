const express = require("express");
const router = express.Router();

// Importamos el modelo
const Recipe = require("../models/Recipe.model.js");

// ITERACIÓN 3 — POST /recipes → Crea una nueva receta
router.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
});

// ITERACIÓN 4 — GET /recipes → Obtiene todas las recetas
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

// ITERACIÓN 5 — GET /recipes/:id → Obtiene una receta por ID
router.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
});

// ITERACIÓN 6 — PUT /recipes/:id → Actualiza una receta
router.put("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,            // Devuelve el documento actualizado
      runValidators: true   // Aplica las validaciones del esquema (ej. enum, required)
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
});

// ITERACIÓN 7 — DELETE /recipes/:id → Elimina una receta
router.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
});

module.exports = router;