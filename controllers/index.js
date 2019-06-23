const ping_controller = require('express').Router()

ping_controller.get('/', (req, res) => {
  res.json({
    success: true,
    message: `This request from ${req.query.name} handled by ping_controller`
  })
})

module.exports = ping_controller