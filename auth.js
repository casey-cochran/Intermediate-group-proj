
const db = require('./db/models');

const userLogin = (req, res, user) => {
    req.session.auth = {
        userId: user.id,
    };
};

const userLogout = (req, res) => {
    delete req.session.auth;
};

const authorize = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/login');
    }
    return next();
};


module.exports = {
    userLogout,
    userLogin,
    authorize
};