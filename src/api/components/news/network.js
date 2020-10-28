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
            Message: "Have fun! and stay informed!",
            yourNew: mNew
        });
    } catch (error) {
        next(error);
    }
})

router.get('/category/:category', async (req, res, next) => {
    const page = req.query.page || 1;
    const { category } = req.params;
    try {
        const news = await controller.getNewsByCategory(category, page);
        res.status(200).json({
            Message: `${category} news!!!`,
            news
        })
    } catch (error) {
        next(error);
    }
})

router.get('/country/:country', async (req, res, next) => {
    const page = req.query.page || 1;
    const { country } = req.params;

    const newsByCountry = await controller.getNewsByCountry(country.toLowerCase(), page);
    try {
        res.status(200).json({
            Message: `Here are your news filtered by ${country}`,
            ...newsByCountry
        })
    } catch (error) {
        next();
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

router.get('/search/all/', async (req, res, next) => {
    const page = req.query.page || 1;
    try {
        const docs = await controller.makeSearch(req.query.search, page)
        res.status(200).json({
            Message: `News that contains: '${req.query.search}'`,
            ...docs
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
            Message: "we nurture the world of knowledge!",
            newAdded
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validationHandler({id: nppIdSchema}, "params"), async (req, res, next) => {
    //  const { userData } = req;
    const { id } = req.params;
    try {
        const deleted = await controller.deleteNew(id);
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
            Message: "Every new added success!"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;