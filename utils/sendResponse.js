const js2xmlparser = require('js2xmlparser');
const json2html = require('json-to-html');
const { toPlainText } = require('json-to-plain-text');

exports.sendJsonResponse = (req, res, statusCode, data, message) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};
exports.sendXmlResponse = (req, res, statusCode, data) => {
  res.setHeader('content-type', 'application/xml');
  return res.status(statusCode).send(js2xmlparser.parse('data', data));
};
exports.sendTextHtmlResponse = (req, res, statusCode, data) => {
  res.setHeader('content-type', 'text/html');
  return res.status(statusCode).send(json2html(JSON.parse(JSON.stringify(data))));
};
exports.sendTextResponse = (req, res, statusCode, data) => {
  res.setHeader('content-type', 'text/plain');
  return res.status(statusCode).send(toPlainText(JSON.parse(JSON.stringify(data))));
};
exports.sendResponse = (req, res, statusCode, data, message) => {
  //console.log(`content nego real`);
  if (req.headers.accept == 'application/xml') this.sendXmlResponse(req, res, statusCode, data);
  else if (req.headers.accept == 'application/json') this.sendJsonResponse(req, res, statusCode, data, message);
  else if (req.headers.accept == 'text/plain') this.sendTextResponse(req, res, statusCode, data);
  else if (req.headers.accept == 'text/html') this.sendTextHtmlResponse(req, res, statusCode, data);
  else this.sendJsonResponse(req, res, statusCode, data, message);
};
