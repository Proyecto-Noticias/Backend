const joi = require('joi');


const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const firstNameSchema = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('That doesnt looks like a name, if you think its an error please contact with an administrator.');
const lastNameSchema = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('That doesnt looks like a lastname, if you think its an error please contact with an administrator.');
const countrySchema = joi.string().min(2).max(50);
const emailSchema = joi.string().max(80).regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).message('That doesnt looks like a valid email');
const passwordSchema = joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).message('Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number');
const isVerifiedSchema = joi.boolean();
//  const boolSchema = joi.boolean();

const createUserSchema = {
    _id: userIdSchema,
    firstName: firstNameSchema.required(),
    lastName: lastNameSchema.required(),
    country: countrySchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
    isVerified: isVerifiedSchema
};

const updateUserSchema = {
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    country: countrySchema,
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