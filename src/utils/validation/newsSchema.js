///// START CODE REVIEW COMMENT

// Excellent code!

///// END CODE REVIEW COMMENT

const joi = require('joi');

const nppIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const nppTitleSchema = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/);
const nppSubTitleSchema = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/);
const nppArticleDateSchema = joi.date();
const nppImageUrlSchema = joi.string().uri();
const nppCategorySchema = joi.string().min(3);
const nppBodySchema = joi.string().min(20);
const nppArticleUrl = joi.string().uri();
const nppJournalSchema = joi.string();
const nppScrappingDateSchema = joi.date();
const nppSentimentSchema = joi.string();

const createNewsPapper = {
    title: nppTitleSchema.required(),
    subTitle: nppSubTitleSchema.required(),
    articleDate: nppArticleDateSchema.required(),
    imageUrl: nppImageUrlSchema.required(),
    category: nppCategorySchema.required(),
    body: nppBodySchema.required(),
    articleUrl: nppArticleUrl.required(),
    journal: nppJournalSchema.required(),
    scrappingDate: nppScrappingDateSchema.required(),
    sentiment: nppSentimentSchema.required()
}

module.exports = {
    nppIdSchema,
    createNewsPapper
}
