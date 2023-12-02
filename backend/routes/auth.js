import { isAuth, passportGoogleAuth, passportGoogleAuthCallback, getUserCallback } from "../controllers/authController.js";
import express from "express";

export const router = express.Router();

router.get("/", isAuth, (req, res) => { res.json({ user: req.user }) });

router.get("/login/google", passportGoogleAuth);

router.get("/login/google/callback", passportGoogleAuthCallback, getUserCallback);
