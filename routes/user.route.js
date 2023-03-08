const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();


router.get("/random", userController.getRandomUser);
router.get("/all", userController.getAllUsers)


module.exports = router;