require('dotenv').config()
const jwt = require('jsonwebtoken')

const createToken = (user) => {
  const token = jwt.sign({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      isAdmin: user.isAdmin
  }, process.env.TOKEN_PHRS_KEY || 'secret', {
    expiresIn: '24h'
  })

  return token;
}

module.exports = {
  createToken
}