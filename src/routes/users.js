const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

router.get("/signin", userController.getSignIn);

router.post("/signin", userController.postSingIn);

router.get("/signup", userController.getSignUp);

router.post("/signup", userController.postSignUp);

router.get("/logout", userController.getLogout);

module.exports = router;
