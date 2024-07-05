function isAdmin (req, res, next) {
    if (req.body.role === "admin") {
        next();
    } else {
        res.status(403).send({
            message: 'Admin Only'
        });
    }
}

module.exports = isAdmin;