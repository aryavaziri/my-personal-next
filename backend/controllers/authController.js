import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import bcrypt from "bcrypt"
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID)


passport.use(
    new GoogleStrategy(
        {
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

export const validate = async (req, res, next) => {
    try {
        const token = req.query.token;
        // console.log(token)
        if (!token) {
            const error = new Error("No Token");
            error.statusCode = 401;
            throw error;
        }
        const userId = jwt.verify(token, "SECRET_KEY").id;
        await User.findByIdAndUpdate(userId, {})
            .then((user) => {
                if (user) {
                    console.log("User is Authenticated from nextjs?!");
                    return res.json(user)
                } else {
                    const error = new Error("No User exist with this credentials!");
                    error.statusCode = 401;
                    throw error;
                }
            })
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}


export const isAuth = async (req, res, next) => {
    try {
        req.isAuth = false;
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            const error = new Error("No Token");
            error.statusCode = 401;
            throw error;
        }
        // console.log(token)
        const userId = jwt.verify(token, "SECRET_KEY").id;
        await User.findByIdAndUpdate(userId, {})
            .then((user) => {
                if (user) {
                    console.log("User is Authenticated!");
                    req.user = user;
                    req.isAuth = true;
                    next();
                } else {
                    const error = new Error("No User exist with this credentials!");
                    error.statusCode = 401;
                    throw error;
                }
            })
    } catch (error) {
        console.log(error.message)
        next();
    }
};

export const getUser = async (req, res, next) => {
    const token = await req.headers["authorization"]?.split(" ")[1];
    // console.log("token: ", req.headers["authorization"])
    try {
        if (!token) {
            return res.json({ error: "No Token" })
        }
        const verifiedUser = token && await jwt.verify(token, "SECRET_KEY");
        console.log("User is Verified!")
        console.log(verifiedUser)
        return res.json({ _id: verifiedUser.id, isAdmin: verifiedUser.isAdmin })
    } catch (error) {
        console.log(error.message)
        next();
    }
};

export const passportGoogleAuth = passport.authenticate("google", { scope: ["email", "profile"] })

export const passportGoogleAuthCallback = passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
})

export const getUserCallback = async (req, res, next) => {
    if (req.user?.verified) {
        let token;
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { lastLogin: Date.now() }
        );
        if (user) {
            token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "SECRET_KEY", {
                expiresIn: "10d",
            });
        } else {
            await User.create({
                email: req.user.email,
                name: req.user.displayName,
                profileImg: req.user.picture,
                language: req.user.language,
                isAdmin: false,
                isGoogleAccount: true,
            })
                .then((user) => {
                    token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "SECRET_KEY", {
                        expiresIn: "10d",
                    });
                })
                .catch(next);
        }
        console.log(token);
        return res.status(201).redirect(`https://aryav.nl/?token=${token}`);
    }
}

export const emailCheck = async (req, res, next) => {
    const data = req.body
    try {
        const [user] = await User.find({ email: data.email, isSignByMail: true })
        if (user) { return res.send("exists") }
        return res.send("not exists")
    }
    catch (err) {
        next(err);
        return res.send(err.message);
    }
}

export const emailConfirm = async (req, res, next) => {
    let token = (req.query["token"])
    let userId
    try {
        try {
            userId = jwt.verify(token, "SECRET_KEY").id;
        } catch (error) {
            if (error.message === 'jwt expired') {
                const userId = await jwt.verify(token, "SECRET_KEY", { ignoreExpiration: true }).id;
                console.log(userId)
                let newUser = await User.findById(userId)
                let newToken = jwt.sign({ id: userId, isAdmin: newUser.isAdmin }, "SECRET_KEY", {
                    expiresIn: "2h",
                })
                const EmailConfirmation = {
                    to: newUser.email,
                    // to: "arya.vaziri@gmail.com",
                    from: "info@aryav.nl",
                    subject: "Please Confirm your email address.",
                    text: 'Please Confirm Your Email.',
                    html: `<div>You have signed up for aryav.nl website. Please click on the link below to confirm your email address.</div><a href="https://aryav.nl/api/confirm?token=${newToken}" >Confirm</a>`,
                }
                await sgMail.send(EmailConfirmation)
                return res.send("Your activation link is expired. Please check your email again for the new link.</a>")
            }
            next(error)
        }
        User.findByIdAndUpdate(userId, {
            isVerified: true,
        })
            .then((user) => {
                if (user) {
                    console.log("Email is Confirmed.");
                    return res.status(201).redirect(`https://aryav.nl/?token=${token}`);
                } else {
                    const error = new Error("No User exist with this credentials!");
                    error.statusCode = 401;
                    throw error;
                }
            })
    } catch (error) {
        next(error);
    }
}

export const emailSignUp = async (req, res, next) => {
    const data = req.body
    try {
        const [user] = await User.find({ email: data.email, isSignByMail: true })
        let token
        if (user) { return res.send("This email is already registered.") }
        bcrypt.hash(data.password, 8, (err, hash) => {
            User.create({
                email: data.email,
                hpassword: hash,
                isSignByMail: true,
            })
                .then((user) => {
                    token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "SECRET_KEY", {
                        expiresIn: "1h",
                    });

                }).then(() => {
                    const EmailConfirmation = {
                        to: data.email,
                        // to: "arya.vaziri@gmail.com",
                        from: "info@aryav.nl",
                        subject: "Please Confirm your email address.",
                        text: "Email confirmation",
                        html: `<div>You have signed up for aryav.nl website. Please click on the link below to confirm your email address.</div><a href="https://aryav.nl/api/confirm?token=${token}" >Confirm</a>`,
                    }
                    sgMail.send(EmailConfirmation)
                })
                .catch(next);
            if (err) { next(err) }
        })
        return res.send("Please check your Email to continue.");
    }
    catch (err) {
        next(err);
        return res.send(err.message);
    }
}

export const emailSignIn = async (req, res, next) => {
    const data = req.body
    try {
        const [user] = await User.find({ email: data.email, isSignByMail: true })

        if (!user) { return res.send("Email does not exists.") }

        if (bcrypt.compareSync(data.password, user.hpassword)) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "SECRET_KEY", {
                expiresIn: "10d",
            });
            console.log("token")
            console.log(token)
            return res.send(token)
            // return res.status(201).redirect(`https://aryav.nl/?token=${token}`);
        } else {
            throw new Error("Invalid password");
        }
    }
    catch (err) {
        next(err);
    }
}