const express = require("express");
const router = express.Router();

const itemsRouter = require("./items");
const profileRouter = require("./profile");
const recipeRouter = require("./recipe");
const userRouter = require("./user");
const settingRouter = require("./setting");

router.use("/items", itemsRouter);
router.use("/profile", profileRouter);
router.use("/recipe", recipeRouter);
router.use("/user", userRouter);
router.use("/setting", settingRouter);

module.exports = router;
