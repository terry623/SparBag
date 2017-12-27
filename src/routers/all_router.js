const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');
const router = express.Router();

router.use(bodyParser.json());

// Sign Up
router.post('/signup', function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    signupModel.check_username(username).then(result => {
        if (result.length > 0) {
            const err = new Error('Account Exist!');
            err.status = 400;
            throw err;
        } else {
            signupModel.create_account(username, password).then(infor => {
                otherModel.show_all_users().then(people => {
                    people.map(result => {
                        if (infor.username !== result.username) {
                            chatModel.add_friends(infor.username, result.username).then(relationship => {}).catch(next);
                        }
                    });
                }).catch(next);
                res.json(infor);
            }).catch(next);
        }
    }).catch(next);

});

// Log In
router.post('/login', function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    console.log("username:" + username);
    console.log("password: "+ password);

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

module.exports = router;