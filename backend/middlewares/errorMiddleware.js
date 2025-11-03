exports.errorHanding = () => {
  return (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message;
    return res.status(errorStatus).json({ error: errorMessage });
  };
};
