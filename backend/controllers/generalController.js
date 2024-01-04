import sgMail from '@sendgrid/mail'
import { Product, Basket } from '../models/test.js'

sgMail.setApiKey(process.env.SENDGRID)

export const contact = async (req, res, next) => {
    const data = req.body
    const msgFWD = {
        to: "arya.vaziri@gmail.com",
        from: "ContactMe@aryav.nl",
        subject: "Contact form from www.aryan.vl",
        text: data.message,
        html: `<div><h3>From: ${data.name}</h3></div> <div> <h4>Email: ${data.email}</h4> <h4>Subject: ${data.subject}</h4> <p>${data.message}</p></div>`,
    }

    const FirstReply = {
        to: `${data.email}`,
        from: "info@aryav.nl",
        subject: `RE [${data.subject} from aryav.nl]`,
        text: `<div>Hello ${data.name},<br /><br />Thank you for reaching out! I'm thrilled to connect with you. I've received your message and will get back to you as soon as possible. In the meantime, feel free to explore more about my work on the website.<br /><br />Looking forward to the opportunity!<br /><br />Best regards,<br />Arya Vaziri</div>`,
        html: `<div><span style={font-weight:"bold";}>Hello ${data.name}</span>,<br /><br />Thank you for reaching out! I'm thrilled to connect with you. I've received your message and will get back to you as soon as possible. In the meantime, feel free to explore more about my work on the website.<br /><br />Looking forward to the opportunity!<br /><br />Best regards,<br />Arya Vaziri</div>`,
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
}


export const test = async (req, res, next) => {
    try {
        const basket = await Basket.findOne({})
        const user = await basket.removeFromCard("657b7b2e1783e36a72add37a")
        return res.json(basket);
    }
    catch (err) {
        return res.json({ error: err.message });
        // next(err);
    }
}