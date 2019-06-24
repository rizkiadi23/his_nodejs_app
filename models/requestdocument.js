'use strict';

const uuid = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  const RequestDocument = sequelize.define('RequestDocument', {
    documentType: DataTypes.STRING,
    metadata: DataTypes.JSONB,
    requesterName: DataTypes.STRING,
    approvedBy: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  RequestDocument.associate = function(models) {
    // associations can be defined here
  };

  RequestDocument.beforeCreate((requestdocument) => {
    requestdocument.id = uuid()
    requestdocument.status = "OPEN"
  })

  return RequestDocument;
};