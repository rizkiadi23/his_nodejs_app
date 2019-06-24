const requestDocuments_controller = require('express').Router()

requestDocuments_controller.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Request handled by requestDocuments_controller'
  })
})

module.exports = requestDocuments_controller