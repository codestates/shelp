const router = require('express').Router();
const controller = require('./../controller');

router.get('/', controller.items.get);
router.post('/', controller.items.post);
router.put('/', controller.items.put);
router.get('/:id', controller.items.getById);
router.delete('/:id', controller.items.delete);

module.exports = router;