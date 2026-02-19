import Recipe from "../models/Recipe.model";

app.post("/recipes", (req, res) => {
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
        .then((createdRecipe) => {
            res.status(201).json(createdRecipe);
        })
        .catch((err) => {
            res.status(500).json({ message: "error while creating new recipe" });
        });
});


