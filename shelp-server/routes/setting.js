const router = require('express').Router();
const controller = require('../controller/setting');

router.put('/', controller.put);

module.exports = router;