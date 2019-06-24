const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    // Forbidden
    res.status(403).json({
      success: false,
      message: 'Unauthorized Access'
    })
  }
}