const index_controller = require('../controllers');
const ping_controller = require('../controllers');
const users_controller = require('../controllers/api/v1/users_controller')
const profiles_controller = require('../controllers/api/v1/profiles_controller')

module.exports = app => {
  app.use('/', index_controller)
  app.use('/ping', ping_controller)
  app.use('/user', users_controller)
  app.use('/profie', profiles_controller)
}