const joi = require('joi');

const categoryNameSchema = joi.string().valid('politics', 'economy', 'sports', 'culture', 'entertainment', 'technology', 'health-lifestyle', 'general').insensitive();
const addCategorySchema = joi.string().min(3).max(30);

const addCategoryStat = {
    category: categoryNameSchema.required()
}

const addCategory = {
    category: addCategorySchema.required()
}
module.exports = {
    addCategoryStat,
    addCategory
}