module.exports = (err, req, res, next) => {
    const statusCode = err.code || 500;
    const message = err.message || 'UNKNOWN_ERROR';
    res.status(statusCode).json({
        error: {
            message,
            statusCode 
        }
    });
}