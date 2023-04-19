const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    type: "SERVER_ERROR",
    errors: [{ 1: "Error from error handler" }],
    message: err.message,

    data:
      process.env.NODE_ENV === "PRODUCTION"
        ? "Something went wrong"
        : err.stack,
  });
};

export default errorHandler;
