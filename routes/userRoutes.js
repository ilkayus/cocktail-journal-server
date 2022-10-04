const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/googleOAuth", authController.googleOAuth);
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signInWithGoogleOAuth", authController.signInWithGoogleOAuth);
module.exports = router;
