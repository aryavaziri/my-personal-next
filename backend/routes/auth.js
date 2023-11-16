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
      // lastLogin: Date.now(),
    })
      .then((user) => {
        if (user) {
          console.log("User is Authenticated?!");
          req.user = user;
          next();
        } else {
          const error = new Error("No User exist with this credentials!");
          error.statusCode = 401;
          throw error;
        }
      })
  } catch (error) {
    next(error);
  }
};

export const auth = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  req.isAuth = false;
  // console.log(token)
  // console.log(req)
  // if (!token) { console.log("KOSSHER"); next() }
  try {
    const userId = jwt.verify(token, "SECRET_KEY").id;

    // User.findByIdAndUpdate(userId, { lastLogin: Date.now() })
    User.findByIdAndUpdate(userId, {})
      .then((user) => {
        if (user?._id == userId) {
          console.log("User is Authenticated!!!!!!!");
          req.user = user;
          req.isAuth = true;
        }
        next();
      })
  } catch (error) {
    // console.log(error)
    next();
  }
};

passport.use(
  new GoogleStrategy(
    {
      // clientID: "process.env.GOOGLE_CLIENT_ID",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://aryav.nl/auth/login/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

router.get("/", isAuth, (req, res) => {
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
          isAdmin: false
        })
          .then((user) => {
            token = jwt.sign({ id: user._id }, "SECRET_KEY", {
              expiresIn: "2d",
            });
          })
          .catch(next);
      }
      console.log(token);
      return res.status(201).redirect(`https://aryav.nl/?token=${token}`);
    }
  }
);
