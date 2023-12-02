import express from "express";
import * as authController from "../controllers/authController.js";
import * as generalController from "../controllers/generalController.js";
export const router = express.Router();



router.post("/email_check", authController.emailCheck)

router.get("/confirm", authController.emailConfirm)

router.post("/signup", authController.emailSignUp)

router.post("/signin", authController.emailSignIn)

router.post("/contact", generalController.contact);

router.get("/validate", authController.validate);