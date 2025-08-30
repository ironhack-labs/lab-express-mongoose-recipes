const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");

// Create
router.post("/recipes", async (req, res) => {
  try {
    const doc = await Recipe.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(500).json({ error: "Failed to create recipe", details: e.message });
  }
});

// Get all
router.get("/recipes", async (_req, res) => {
  try {
    const docs = await Recipe.find().sort({ created: -1 });
    res.status(200).json(docs);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch recipes", details: e.message });
  }
});

// Get one
router.get("/recipes/:id", async (req, res) => {
  try {
    const doc = await Recipe.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(doc);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch recipe", details: e.message });
  }
});

// Update
router.put("/recipes/:id", async (req, res) => {
  try {
    const doc = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(doc);
  } catch (e) {
    res.status(500).json({ error: "Failed to update recipe", details: e.message });
  }
});

// Delete
router.delete("/recipes/:id", async (req, res) => {
  try {
    const doc = await Recipe.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Recipe not found" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: "Failed to delete recipe", details: e.message });
  }
});

module.exports = router;
