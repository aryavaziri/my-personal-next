import express from "express";
export const router = express.Router();
import { isAuth } from "../controllers/authController.js";

router.get("/lists", (req, res, next) => {
  return res.send("GET LIST");
});
