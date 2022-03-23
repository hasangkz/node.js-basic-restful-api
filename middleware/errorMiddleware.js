const handle = (err, req, res, next) => {
  res.json({
    errorCode: err.statusCode,
    message: err,
  });
};
module.exports = handle;
