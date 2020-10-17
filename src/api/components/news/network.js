const express = require('express');
const router = express.Router();
//  const validationHandler = require('../../../utils/middlewares/validationHandler'); 
//  const checkAuth = require('../../../utils/middlewares/check-auth');
const controller = require('./controller');


router.get('/', async (req, res, next) => {
    try {
        const news = await controller.getAllNews();
        res.status(200).json({
            Message: "Here are the news! 📰",
            news
        })
    } catch (error) {
        next(error);
    }
})



module.exports = router;