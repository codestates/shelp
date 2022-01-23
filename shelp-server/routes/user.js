const router = require('express').Router();
const controller = require('../controller');

router.get('/signout', controller.user.signout);
router.post('/signup', controller.user.signup);
router.post('/signin', controller.user.signin);
router.post('/check', controller.user.check);

module.exports = router;