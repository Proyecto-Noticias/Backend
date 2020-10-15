const express = require('express')
const router = express.Router()
const mock = require('../../../mocks/mock_users')


router.get('/', async (req, res, next) => {
    try {
        const data = await Promise.resolve(mock)

        res.status(200).json({
            data,
            message: "users listed"
        })
    } catch (error) {
        next();
    }
})


router.post('/signup', (req, res) => {
    res.send({
        message:"hi"
    })
})


module.exports = router;