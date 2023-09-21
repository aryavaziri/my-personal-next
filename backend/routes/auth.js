import express from "express";
export const router = express.Router();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      const error = new Error("No Token");
      error.statusCode = 401;
      throw error;
    }
    const userId = jwt.verify(token, "SECRET_KEY").id;
    User.findByIdAndUpdate(userId, {
      lastLogin: Date.now(),
    })
      .then((user) => {
        if (user) {
          console.log("User is Authenticated");
          req.user = user;
          next();
        } else {
          const error = new Error("No User exist with this credentials!");
          error.statusCode = 401;
          throw error;
        }
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};

passport.use(
  new GoogleStrategy(
    {
      // clientID: "process.env.GOOGLE_CLIENT_ID",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

router.get("/auth", isAuth, (req, res) => {
  res.json({ user: req.user });
});

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res, next) => {
    if (req.user?.verified) {
      let token;
      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { lastLogin: Date.now() }
      );
      if (user) {
        token = jwt.sign({ id: user._id }, "SECRET_KEY", {
          expiresIn: "1h",
        });
      } else {
        await User.create({
          email: req.user.email,
          name: req.user.displayName,
          profileImg: req.user.picture,
          language: req.user.language,
        })
          .then((user) => {
            token = jwt.sign({ id: user._id }, "SECRET_KEY", {
              expiresIn: "1h",
            });
          })
          .catch(next);
      }
      console.log(token);
      return res.status(201).redirect(`http://localhost:4000/?token=${token}`);
    }
  }
);
