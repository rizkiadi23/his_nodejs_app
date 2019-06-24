'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequestDocument = sequelize.define('RequestDocument', {
    documentType: DataTypes.STRING,
    metadata: DataTypes.JSON,
    requesterName: DataTypes.STRING,
    approvedBy: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  RequestDocument.associate = function(models) {
    // associations can be defined here
  };
  return RequestDocument;
};