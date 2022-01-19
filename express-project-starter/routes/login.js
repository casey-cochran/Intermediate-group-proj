var express = require('express');
var router = express.Router();
const db = require('../db/models')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const { userLogin } = require('../auth.js');
const { asyncHandler, csrfProtection, loginValidators } = require("./utils");


router.get('/', csrfProtection, function (req, res, next) {
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
    });
});

router.post('/', csrfProtection, loginValidators,
    asyncHandler(async (req, res) => {

        const {
            email,
            password,
        } = req.body;

        let errors = [];
        const validationErrors = validationResult(req);

        if (validationErrors.isEmpty()) {
            const user = await db.User.findOne({ where: { email } });

            if (user !== null) {
                const passwordsMatch = await bcrypt.compare(password, user.hashedPass.toString());
                if (passwordsMatch) {    
                    userLogin(req, res, user);
                    // return res.redirect('/');
                    return req.session.save(() => res.redirect('/'))
                }
            }
            errors.push('Login failed with given credentials.');
        } else {
            errors = validationErrors.array().map((error) => error.msg);
        }

        res.render('login', {
            title: 'Login',
            email,
            errors,
            csrfToken: req.csrfToken(),
        });
    }));


module.exports = router;