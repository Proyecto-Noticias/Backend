const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validationHandler = require('../../../utils/middlewares/validationHandler');
const checkAuth = require('../../../utils/middlewares/check-auth');
const { addCategoryStat, addCategory } = require('../../../utils/validation/categoriesSchema');


router.get('/', async (req, res, next) => {
    try {
        const categories = await controller.getCatStats();
        res.status(200).json({
            Message: "With great power comes great responsibility",
            categories
        })
    } catch (error) {
        next(error)
    }
})


router.post('/stat', validationHandler(addCategoryStat), async (req, res, next) => {
    const { category } = req.body
    try {
        await controller.addCatConsumed(category);
        res.status(200).json({
            Message: "Updated."
        });
    } catch (error) {
        next(error);
    }
});


router.post('/add', validationHandler(addCategory), checkAuth, async (req, res, next) => {
    const { userData } = req;
    const { category } = req.body
    try {
        const added = await controller.addCategory(category, userData);
        res.status(200).json({
            Message: "Category added successfully",
            added
        })
    } catch (error) {
        next(error);
    }
});

router.post('/update', async(req, res, next) => {
    try {
        const data = await controller.updateCats(); 
        res.status(200).json({
            Message: "Everything success",
            data
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;