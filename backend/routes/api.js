import express from "express";
import { isAuth } from "./auth.js";
import sgMail from '@sendgrid/mail'
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
export const router = express.Router();


sgMail.setApiKey(process.env.SENDGRID)

router.post("/email_check", async (req, res, next) => {
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
})


router.get("/confirm", async (req, res, next) => {
    let token = (req.query["token"])
    let userId
    try {
        try {
            userId = jwt.verify(token, "SECRET_KEY").id;
        } catch (error) {
            if (error.message === 'jwt expired') {
                const userId = await jwt.verify(token, "SECRET_KEY", { ignoreExpiration: true }).id;
                console.log(userId)
                let neweUserId = await User.findById(userId)
                let newToken = jwt.sign({ id: userId }, "SECRET_KEY", {
                    expiresIn: "1m",
                })
                const EmailConfirmation = {
                    to: neweUserId,
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

})


router.post("/signup", async (req, res, next) => {
    const data = req.body
    try {
        const [user] = await User.find({ email: data.email, isSignByMail: true })
        let token
        let hashp
        if (user) { return res.send("This email is already registered.") }
        bcrypt.hash(data.password, 8, (err, hash) => {
            User.create({
                email: data.email,
                hpassword: hash,
                isSignByMail: true,
            })
                .then((user) => {
                    token = jwt.sign({ id: user._id }, "SECRET_KEY", {
                        expiresIn: "1m",
                    });

                }).then(() => {
                    const EmailConfirmation = {
                        // to: data.email,
                        to: "arya.vaziri@gmail.com",
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

})


router.post("/signin", async (req, res, next) => {
    const data = req.body
    try {
        const [user] = await User.find({ email: data.email, isSignByMail: true })

        if (!user) { return res.send("Email does not exists.") }

        if (bcrypt.compareSync(data.password, user.hpassword)) {
            const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
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

})


router.post("/contact", async (req, res, next) => {
    const data = req.body
    const msgFWD = {
        to: "arya.vaziri@gmail.com",
        from: "ContactMe@aryav.nl",
        subject: "Contact form from www.aryan.vl",
        text: data.Message,
        html: `<div><h3>From: ${data.Name}</h3></div> <div> <h4>Email: ${data.Email}</h4> <h4>Subject: ${data.Subject}</h4> <p>${data.Message}</p></div>`,
    }

    const FirstReply = {
        to: `${data.Email}`,
        from: "info@aryav.nl",
        subject: `RE [${data.Subject} from aryav.nl]`,
        text: `<div>Hello ${data.Name},<br /><br />Thank you for reaching out! I'm thrilled to connect with you. I've received your message and will get back to you as soon as possible. In the meantime, feel free to explore more about my work on the website.<br /><br />Looking forward to the opportunity!<br /><br />Best regards,<br />Arya Vaziri</div>`,
        html: `<div><span style={font-weight:"bold";}>Hello ${data.Name}</span>,<br /><br />Thank you for reaching out! I'm thrilled to connect with you. I've received your message and will get back to you as soon as possible. In the meantime, feel free to explore more about my work on the website.<br /><br />Looking forward to the opportunity!<br /><br />Best regards,<br />Arya Vaziri</div>`,
    }
    try {
        await sgMail.send(msgFWD)
        await sgMail.send(FirstReply)
        return res.json({ message: "Thanks for your contact. We will contact you as soon as possible." });
    }
    catch (err) {
        next(err);
        return res.json({ message: err.message });
    }

});
