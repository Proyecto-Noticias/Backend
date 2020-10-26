const user = require("../components/user/network");
const email = require("../components/email/network");
const news = require("../components/news/network");
const categories = require("../components/categories/network");
const token = require("../components/token/network");

const routes = (app) => {
    app.use('/api/user', user);
    app.use('/api/confirmation', email);
    app.use('/api/news', news);
    app.use('/api/categories', categories);
    app.use('/api/token', token);
}

module.exports = routes;