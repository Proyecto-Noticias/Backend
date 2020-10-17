require('dotenv').config()
const jwt = require('jsonwebtoken')

const createToken = (user) => {
  const token = jwt.sign({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      idAdmin: user.isAdmin
  }, process.env.TOKEN_PHRS_KEY || 'secret')

  return token;
}

module.exports = {
  createToken
}