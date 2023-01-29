const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users.controller");

// SIGNUP
router.put("/signup", controllers.signup);

// LOGIN
router.put("/login", controllers.login);

module.exports = router;
