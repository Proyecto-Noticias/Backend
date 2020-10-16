const user = require("../components/user/network")
const email = require("../components/email/network");


const routes = (app) => {
    app.use('/api/user', user);
    app.use('/api/confirmation', email);
}

module.exports = routes;