const express = require('express');
const router = express.Router();
const validationHandler = require('../../../utils/middlewares/validationHandler');
const checkAuth = require('../../../utils/middlewares/check-auth');
const controller = require('./controller');
const { 
    nppIdSchema,
    createNewsPapper 
} = require('../../../utils/validation/newsSchema');

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const mNew = await controller.getOneNew(id);
        res.status(200).json({
            Message: "Have fun! and stay informed! 😁😁",
            yourNew: mNew
        });
    } catch (error) {
        next(error);
    }
})

router.get('/category/:category', async (req, res, next) => {
    const { category } = req.params;
    try {
        const newsByCategory = await controller.getNewsByCategory(category);
        res.status(200).json({
            Message: `${category} news!!! 🎉🎈😁😁`,
            news: newsByCategory
        })
    } catch (error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    const page = req.query.page || 1;
    try {
        const news = await controller.getAllNews(page);
        res.status(200).json({
            Message: "Here are the news! 📰",
            news
        })
    } catch (error) {
        next(error);
    }
})

router.post('/', validationHandler(createNewsPapper), checkAuth, async (req, res, next) => {
    const { title, subtitle, articleDate, imageUrl, category, body,articleUrl, journal, scrappingDate, sentiment } = req.body;
    const { userData } = req;

    try {
        const newAdded = await controller.addNew(title, subtitle, articleDate, imageUrl, category, body, articleUrl, journal, scrappingDate, sentiment, userData);
        res.status(200).json({
            Message: "we nurture the world of knowledge! 🧠🧠🧠🧠",
            newAdded
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validationHandler({id: nppIdSchema}, "params"), checkAuth, async (req, res, next) => {
    const { userData } = req;
    const { id } = req.params;
    try {
        const deleted = await controller.deleteNew(id, userData);
        res.status(200).json({
            Message: "New deleted",
            deleted
        })
    } catch (error) {
        next(error);
    }
})


router.post('/specialroute', async (req, res, next) => {
    try {
        await controller.specialRoute();
        res.status(200).json({
            Message: "Every new added success! 🥰🥰🥰"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;