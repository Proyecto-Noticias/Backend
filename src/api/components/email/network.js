const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const user = await controller.verifyToken(token);
        res.status(200).json({
            Message: "Verification success 🍭",
            user
        })
    } catch (error) {
        console.log(error)
        const finalMessage = error.message; 
        res.status(500).json({
            Message: finalMessage || "Something wrong happend"
        })
    }
})

router.post('/resend', async (req, res) => {
    const { email } = req.body;

    try {
        await controller.resendEmail(email, req.headers.host);
        res.status(200).json({
            Message: "We've sent you an email with a link confirmation to verify your email address! 🐠"
        })
    } catch (error) {
        const finalMessage = error.message; 
        res.status(500).json({
            Message: finalMessage || "Something wrong happend"
        })
    }
})

module.exports = router;
