const user = require("../components/user/network")


const routes = (app) => {
    app.use('/api/user', user)
}

module.exports = routes;