const errorMiddleware = (error, req, res, next) => {
  console.log(error.message);

  res.status(500).json({
    success: false,

    message: error.message || "Server Error",
  });
};

module.exports = errorMiddleware;
