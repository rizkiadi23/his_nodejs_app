const profiles_controller = require('express').Router()

profiles_controller.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Handled by profiles_controller'
  })
})

module.exports = profiles_controller