const index_controller = require('../controllers');
const ping_controller = require('../controllers');
const users_controller = require('../controllers/api/v1/users_controller')
const requestDocuments_controller = require('../controllers/api/v1/requestDocuments_controller')

module.exports = app => {
  app.use('/ping', ping_controller)
  app.use('/api/v1/user', users_controller)
  app.use('/api/v1/request_document', requestDocuments_controller)
  app.use('*', index_controller)
}