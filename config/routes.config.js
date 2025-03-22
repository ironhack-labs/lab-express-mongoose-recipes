const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const createError = require('http-errors');
const recipes = require('../controllers/recipes.controller');

router.post('/recipes', recipes.create);
