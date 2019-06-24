const ping_controller = require('express').Router()

ping_controller.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html')
})

module.exports = ping_controller