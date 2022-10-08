export default function errorHandler(err, req, res, next) {
    next(res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    }));
}