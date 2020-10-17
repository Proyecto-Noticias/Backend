const express = require('express')
const router = express.Router()
const controller = require('./controller');
//  const mock = require('../../../mocks/mock_users')
const checkAuth = require('../../../utils/middlewares/check-auth');


router.get('/', async (req, res, next) => {
    try {
        const users = await controller.getEveryUser();
        res.status(200).json({
            Message: "Get every user! 👀👀",
            users
        });
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await controller.getOneUser(id);
        res.status(200).json({
            Message: "Here is your user! 👽👽👽",
            user
        })
    } catch (error) {
        next(error);
    }
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

router.delete('/:id', checkAuth, async (req, res, next) => {
    const { userData } = req;
    const { id } = req.params;
    try {
        await controller.deleteUser(id, userData);
        res.status(200).json({
            Message: `User ${userData.firstName} has been deleted successfully`
        })
    } catch (error) {
        next(error)
    }
    
})

router.patch('/:id', checkAuth, async (req, res, next) => {
    const { id } = req.params;
    const { userData } = req;
    const { firstName, lastName, password, isAdmin, email } = req.body;

    try {
        const userUpdated = await controller.editUser(id, firstName, lastName, email, password, isAdmin, userData);
        res.status(200).json({
            Message: "User updated! 🤗🤗🤗",
            userUpdated
        })
    } catch (error) {
        next(error);
    }
})


module.exports = router;