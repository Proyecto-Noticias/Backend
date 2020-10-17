const express = require('express')
const router = express.Router()
const controller = require('./controller');
//  const mock = require('../../../mocks/mock_users')
const checkAuth = require('../../../utils/middlewares/check-auth');


router.get('/', async (req, res) => {
    res.send('sup')
})

router.get('/:id', (req, res) => {
    res.send({
        message: "user"
    })
})

router.post('/signup', async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        await controller.signUp(firstName, lastName, email, password, req.headers.host);
        res.status(200).json({Messaje: "We've sent you an email with a link confirmation to verify your email address! 📧🐰"})
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
   const { email, password } = req.body;

   try {
       const token = await controller.login(email, password);
       res.status(200).json({
           Message: "Login success! 🎉🎉",
           token
       })
   } catch (error) {
       next(error)    
   }

})

router.delete('/:id', checkAuth, (req, res, next) => {
    try {
        res.send({
            message: "deleted"
        })
    } catch (error) {
        next(error)
    }
    
})

router.put('/:id', (req, res) => {
    res.send({
        message: "edited"
    })
})


module.exports = router;