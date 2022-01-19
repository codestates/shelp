const router = require('express').Router();
const controller = require('./../controller');

router.get('/', controller.recipe.get);
router.get('/:id', controller.recipe.getById);

module.exports = router;