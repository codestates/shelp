const router = require('express').Router();
const controller = require('../controller/kakao');

router.get('/auth/kakao', controller.get);
router.get('/auth/kakao/callback', controller.callback);

module.exports = router;