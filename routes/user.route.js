const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();


router.get("/random", userController.getRandomUser);
router.get("/all", userController.getAllUsers)

router.post("/save", userController.saveAUser)


module.exports = router;