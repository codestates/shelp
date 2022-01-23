const router = require("express").Router();
const controller = require("../controller/recipe");

router.get("/", controller.get);
router.get("/:id", controller.getById);

module.exports = router;
