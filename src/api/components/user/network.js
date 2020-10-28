const express = require('express')
const router = express.Router()
const controller = require('./controller');
const { userIdSchema, createUserSchema, updateUserSchema, loginSchema } = require('../../../utils/validation/userSchemas');
const validationHandler = require('../../../utils/middlewares/validationHandler');
//  const mock = require('../../../mocks/mock_users')
const checkAuth = require('../../../utils/middlewares/check-auth');
const boom = require('@hapi/boom');


router.get('/', async (req, res, next) => {
    try {
        const users = await controller.getEveryUser();
        res.status(200).json({
            Message: "Get every user!",
            users
        });
    } catch (error) {
        next(error);
    }
})

router.get('/:id', validationHandler({ id: userIdSchema }, "params"), async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await controller.getOneUser(id);
        if(!user){
            throw boom.notFound("Sorry! but that user looks like doesnt exists");
        }
        res.status(200).json({
            Message: "Here is your user!",
            user
        })
    } catch (error) {
        next(error);
    }
})

router.post('/signup', validationHandler(createUserSchema), async (req, res, next) => {
    const { _id, firstName, lastName, country, email, password, isVerified } = req.body;
    try {
        await controller.signUp(_id, firstName, lastName, country, email, password, req.headers.host, isVerified);
        res.status(201).json({message: "We've sent you an email with a link confirmation to verify your email address! 📧"})
    } catch (error) {
        next(error)
    }
})

router.post('/login', validationHandler(loginSchema), async (req, res, next) => {
   const { email, password } = req.body;
   try {
       const data = await controller.login(email, password);
       res.status(200).json({
           Message: "Login success!",
           data
       })
   } catch (error) {
       next(error)    
   }

})

router.delete('/:id', validationHandler({ id: userIdSchema.required() }, "params"), checkAuth, async (req, res, next) => {
    const { userData } = req;
    const { id } = req.params;
    try {
        await controller.deleteUser(id, userData);
        res.status(200).json({
            Message: `User has been deleted successfully`
        })
    } catch (error) {
        next(error)
    }
    
})

router.patch('/:id', validationHandler({ id: userIdSchema.required() }, "params"), validationHandler(updateUserSchema), checkAuth, async (req, res, next) => {
    const { id } = req.params;
    const { userData } = req;
    const { firstName, lastName, password, isAdmin, email } = req.body;

    try {
        const userUpdated = await controller.editUser(id, firstName, lastName, email, password, isAdmin, userData);
        res.status(200).json({
            Message: "User updated!",
            user: userUpdated
        })
    } catch (error) {
        next(error);
    }
})

router.post('/makeAdmin', checkAuth, async(req, res, next) => {
    const { userData } = req;
    const { id, role } = req.body;
    try {
        const user = await controller.changeAdmin(id, role, userData);
        let finalUser = {
            email: user.email,
            isAdmin: user.isAdmin
        }
        res.status(200).json({
            Message: "User role changed successfully",
            finalUser
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;