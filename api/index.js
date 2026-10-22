const { handleRequest } = require('../preview-server/server');

module.exports = (req, res) => {
  return handleRequest(req, res);
};
