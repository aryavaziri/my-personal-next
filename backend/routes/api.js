import express from "express";
import { isAuth } from "./auth.js";
import sgMail from '@sendgrid/mail'
import { User } from "../models/user.js";

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
