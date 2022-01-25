const router = require('express').Router();
const controller = require('../controller');

router.get('/', controller.profile.get);
router.put('/', controller.profile.put);
router.delete('/', controller.profile.delete);

module.exports = router;