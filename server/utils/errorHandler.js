errorHandler = (err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).json({
      code: 500,
      msg: "服务器错误!",
    });
  } else {
    next();
  }
};
module.exports = errorHandler;
