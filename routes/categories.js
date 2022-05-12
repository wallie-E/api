const express = require('express');
const categories = require('../controllers/categories');
const router = express.Router();


router.post('/', categories.createCat);
router.get('/', categories.getCats);

module.exports = router