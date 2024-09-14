const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/users-controller");

router.get("/", usersControllers.getAllUsers);

router.get("/:uid", usersControllers.getUserById);

router.post("/signup", usersControllers.signup);

router.post("/login", usersControllers.login);

module.exports = router;
