const express = require('express');
const router = express.Router();
const checkAuth = require('../../../utils/middlewares/check-auth');
const controller = require('./controller');


router.post('/renew', checkAuth, async (req, res, next) => {
    const { userData } = req;
    try {
        const newToken = await controller.renewJwt(userData);
        res.status(200).json({
            Message: "Here is your new token",
            jwt: newToken
        })
    } catch (error) {
        next(error);
    }
})


module.exports = router;