module.exports = errorHandler;

function errorHandler(err, req, res, next) {    
    return res.status(400).json({ message: err.message });
}