import express from "express";
import { isAuth } from "./auth.js";
import sgMail from '@sendgrid/mail'

export const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID)

router.post("/contact", async (req, res, next) => {
    const data = req.body
    const msg = {
        to: "arya.vaziri@gmail.com",
        from: "ContactMe@aryav.nl",
        subject: "Contact form from www.aryan.vl",
        text: data.Message,
        html: `<div><h3>From: ${data.Name}</h3></div> <div> <h4>Email: ${data.Email}</h4> <h4>Subject: ${data.Subject}</h4> <p>${data.Message}</p></div>`,
    }
    try {
        await sgMail.send(msg)
        return res.json({ message: data?.Message });
    }
    catch (err) {
        next(err);
        return res.json({ message: err.message });
    }

});
