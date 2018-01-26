const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');
const weightModel = require('../model/weight.js');
const reserveModel = require('../model/reserve.js');
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
        user,
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
        money,
        remain_kg
    } = req.body;

    console.log("/ Submit Weight /");
    console.log(req.body);

    weightModel.store_infor(
        user,
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
        money,
        remain_kg
    ).then(infor => {
        console.log("Success!");
        res.json(infor);
    }).catch(next);

});

router.post('/get_weight', function (req, res, next) {

    const {
        user
    } = req.body;

    console.log("/ Get Weight /")
    console.log(req.body);

    weightModel.get_weight(user).then(result => {
        console.log("Success!");
        res.json(result);
    }).catch(next);

});

router.post('/search_by_num', function (req, res, next) {

    const {
        fly_num,
        date
    } = req.body;

    console.log("/ Search By Num /")
    console.log(req.body);

    weightModel.search_by_num(fly_num, date).then(result => {
        if (result.length > 0) {
            console.log("Success!");
            res.json(result);
        } else {
            const err = new Error('Wrong Get Weight!');
            err.status = 400;
            throw err;
        }
    }).catch(next);

});

router.post('/search_by_place', function (req, res, next) {

    const {
        dep,
        arr,
        date
    } = req.body;

    console.log("/ Search By Place /")
    console.log(req.body);

    weightModel.search_by_place(dep, arr, date).then(result => {
        if (result.length > 0) {
            console.log("Success!");
            res.json(result);
        } else {
            const err = new Error('Wrong Get Weight!');
            err.status = 400;
            throw err;
        }
    }).catch(next);

});

router.post('/search_by_id', function (req, res, next) {

    const {
        id
    } = req.body;

    console.log("/ Search By Id /")
    console.log(req.body);

    weightModel.search_by_id(id).then(result => {
        console.log("Success!");
        res.json(result);
    }).catch(next);

});

router.post('/store_relation', function (req, res, next) {

    const {
        weight_id,
        lend,
        borrow,
        ask_time,
        ask_kg
    } = req.body;

    console.log("/ Store Relation /")
    console.log(req.body);

    reserveModel.store_relation(weight_id, lend, borrow, ask_time, ask_kg).then(result => {
        weightModel.search_by_id(weight_id).then(infor => {
            weightModel.update_remain_kg(infor.id, infor.remain_kg, ask_kg).then(infor => {
                console.log("Success!");
                res.json(infor);
            }).catch(next);
        }).catch(next);
    }).catch(next);

});

router.post('/search_reserve', function (req, res, next) {

    const {
        lend,
        borrow,
        weight_id
    } = req.body;

    console.log("/ Search Reserve /")
    console.log(req.body);

    reserveModel.search_reserve(lend, borrow, weight_id).then(result => {
        if (result.length > 0) {
            console.log("Success!");
            res.json(result);
        } else {
            res.json(0);
        }
    }).catch(next);

});

router.post('/search_reserve_by_weight_id', function (req, res, next) {

    const {
        id
    } = req.body;

    console.log("/ Search Reserve By Weight ID /")
    console.log(req.body);

    reserveModel.search_reserve_by_weight_id(id).then(result => {
        if (result.length > 0) {
            console.log("Success!");
            res.json(result);
        } else {
            res.json(0);
        }
    }).catch(next);

});

router.post('/search_reserve_by_borrow', function (req, res, next) {

    const {
        user
    } = req.body;

    console.log("/ Search Reserve By Borrow /")
    console.log(req.body);

    reserveModel.search_reserve_by_borrow(user).then(result => {
        if (result.length > 0) {
            console.log("Success!");
            res.json(result);
        } else {
            res.json(0);
        }
    }).catch(next);

});

module.exports = router;