const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');
const weightModel = require('../model/weight.js');
const otherModel = require('../model/other.js');
const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', function (req, res, next) {

    const {
        username,
        email,
        password,
        passportnumber
    } = req.body;

    console.log("/ Sign Up /")
    console.log(req.body);

    signupModel.check_username(username).then(result => {
        if (result.length > 0) {
            const err = new Error('Account Exist!');
            err.status = 400;
            throw err;
        } else {
            signupModel.create_account(username, email, password, passportnumber).then(infor => {
                console.log("Success!");
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

    console.log("/ Log In /");
    console.log(req.body);

    loginModel.verify(username).then(infor => {
        if (infor.length > 0) {
            if (infor[0].password === password) {
                console.log("Success!");
                console.log(infor);
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

router.post('/submit_weight', function (req, res, next) {

    const {
        weight,
        departure,
        arrive,
        fly_way,
        flight_1,
        flight_2,
        flight_3,
        company,
        book_date,
        meet_start_time,
        meet_end_time,
        meet_place,
        money_type,
        money
    } = req.body;

    console.log("/ Submit Weight /");
    console.log(req.body);

    weightModel.store_infor(
        weight,
        departure,
        arrive,
        fly_way,
        flight_1,
        flight_2,
        flight_3,
        company,
        book_date,
        meet_start_time,
        meet_end_time,
        meet_place,
        money_type,
        money
    ).then(infor => {
        console.log("Success!");
        res.json(infor);
    }).catch(next);

});

module.exports = router;