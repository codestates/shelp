const router = require('express').Router();
const controller = require('./../controller');

router.get('/', controller.items.get);

module.exports = router;