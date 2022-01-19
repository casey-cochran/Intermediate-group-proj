
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

const restoreUser = async(req,res,next) => {
    //this console is so that we can see whether user logged in or not
    console.log(req.session)

    if(req.session.auth) {
        const {userId} = req.session.auth;

        try{
            const user = await db.User.findByPk(userId);

            if(user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        }catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
}


module.exports = {
    userLogout,
    userLogin,
    authorize,
    restoreUser
};
