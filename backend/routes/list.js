import express from "express";
export const router = express.Router();
import { isAuth } from "./auth.js";

router.get("/lists", isAuth, (req, res, next) => {
  return res.send("GET LIST");
});
