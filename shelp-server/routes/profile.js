const router = require("express").Router();
const controller = require("../controller/profile");

router.get("/", controller.get);
router.put("/", controller.put);
router.delete("/", controller.delete);

module.exports = router;
