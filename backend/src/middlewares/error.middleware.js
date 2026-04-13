export const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: "error",
    message: err.message || "Internal Server Error",
  });
};