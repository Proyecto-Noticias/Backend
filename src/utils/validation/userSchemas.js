const joi = require('@hapi/joi');


const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const firstNameSchema = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/);
const lastNameSchema = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/);
const emailSchema = joi.string().max(80).regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
const passwordSchema = joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).label('Password minimum eight characters, at least one uppercase letter, one lowercase letter and one number 🐲🐲');
//  const boolSchema = joi.boolean();

const createUserSchema = {
    firstName: firstNameSchema.required(),
    lastName: lastNameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required()
};

const updateUserSchema = {
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    password: passwordSchema
};

const loginSchema = {
    email: emailSchema.required(),
    password: passwordSchema.required()
}

module.exports = {
    userIdSchema, 
    createUserSchema,
    updateUserSchema,
    loginSchema
};