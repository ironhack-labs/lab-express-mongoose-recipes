const createError = require('http-errors');
const recipe = require('../models/Recipe.model');

//Post
module.exports.create = (req, res, next) => {
  const { body } = req;
  Event.create(body)
    .then((event) => res.status(201).json(event))
    .catch((error) => next(error));
};
