const router = require("express").Router();
const controller = require("../controller/item");

router.get("/", controller.get);
router.post("/", controller.post);
router.put("/", controller.put);
router.get("/:id", controller.getById);
router.delete("/:id", controller.delete);

module.exports = router;
