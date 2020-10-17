const user = require("../components/user/network");
const email = require("../components/email/network");
const news = require("../components/news/network");


const routes = (app) => {
    app.use('/api/user', user);
    app.use('/api/confirmation', email);
    app.use('/api/news', news);
}

module.exports = routes;