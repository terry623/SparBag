const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');
const otherModel = require('../model/other.js');
const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', function (req, res, next) {

    const {
        username,
        email,
        password1,
        passportnumber
    } = req.body;

    console.log("Sign Up!")
    console.log(username + ", " + email + ", " + password1 + ", " + passportnumber);

    signupModel.check_username(username).then(result => {
        if (result.length > 0) {
            const err = new Error('Account Exist!');
            err.status = 400;
            throw err;
        } else {
            signupModel.create_account(username, password1).then(infor => {
                res.json(infor);
            }).catch(next);
        }
    }).catch(next);

});

router.post('/login', function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    console.log("Log In!")
    // console.log(username + ", " + password);
    console.log(req.body);

    loginModel.verify(username).then(infor => {
        if (infor.length > 0) {
            if (infor[0].password === password) {
                res.json(infor);
            } else {
                const err = new Error('Wrong Password!');
                err.status = 400;
                throw err;
            }
        } else {
            const err = new Error('Wrong Account!');
            err.status = 400;
            throw err;
        }
    }).catch(next);

});

router.post('/show_all_users', function (req, res, next) {

    otherModel.show_all_users().then(infor => {
        res.json(infor);
    }).catch(next);

});

module.exports = router;