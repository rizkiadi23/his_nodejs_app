const ping_controller = require('express').Router()

ping_controller.get('/', (req, res) => {
  return res.sendFile('index.html', { root: __dirname + '/../public/' })
})

module.exports = ping_controller