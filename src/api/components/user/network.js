const express = require('express')
const router = express.Router()
const controller = require('./controller');
//  const mock = require('../../../mocks/mock_users')


router.get('/', async (req, res) => {
    res.send('sup')
})

router.get('/:id', (req, res) => {
    res.send({
        message: "user"
    })
})

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        await controller.addUser(firstName, lastName, email, password, req.headers.host);
        res.status(200).json({Messaje: "We've sent you an email with a link confirmation to verify your email address! ✉"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({Error: `Something wrong happend: ${error.message}`})
    }
})

router.post('/login', (req, res) => {
    res.send({
        message: "login"
    })
})

router.delete('/:id', (req, res) => {
    res.send({
        message: "deleted"
    })
})

router.put('/:id', (req, res) => {
    res.send({
        message: "edited"
    })
})


module.exports = router;