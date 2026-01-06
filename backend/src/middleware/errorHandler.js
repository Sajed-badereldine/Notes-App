export const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);

  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};