const router = require('express').Router();
const controller = require('../controller/auth');

router.get('/signout', controller.signout);
router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.post('/check', controller.check);
router.post('/mail', controller.mail);


module.exports = router;