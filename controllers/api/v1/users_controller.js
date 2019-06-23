const users_controller = require('express').Router()
const api_response = require('../../../models/api_response')
const bcrypt = require('bcrypt')
const validation = require('../../../validations/user_validation')
const User = require('../../../models/user')

users_controller.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Handled by users_controller'
  })
})

users_controller.post('/login', (req, res) => {

})

users_controller.post('/register', (req, res) => {
  
})

users_controller.delete('/logout', (req, res) => {

})

module.exports = users_controller