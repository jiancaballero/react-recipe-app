const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users.controller");
const User = require("../models/users.model");
// const {check} = require('express-validator')
// SIGNUP

router.post("/signup", controllers.signup);

// LOGIN
router.post("/login", controllers.login);

module.exports = router;
