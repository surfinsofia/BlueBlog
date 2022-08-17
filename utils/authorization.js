// makes sure that the user is logged in before entering certain URL endpoints
const authorization = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login')
    } else {
        next();
    }
}

module.exports = authorization