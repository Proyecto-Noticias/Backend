const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/:token', async (req, res, next) => {
    const { token } = req.params;
    try {
        await controller.verifyToken(token);

        res.status(200).redirect("https://alwaysupdate.vercel.app/confirmation");
    } catch (error) {
        next(error);
    }
})

router.post('/resend', async (req, res, next) => {
    const { email } = req.body;

    try {
        await controller.resendEmail(email, req.headers.host);
        res.status(200).json({
            Message: "We've sent you an email with a link confirmation to verify your email address!"
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;
