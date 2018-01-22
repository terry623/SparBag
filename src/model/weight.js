if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function store_infor(
    username,
    kg,
    dep,
    arr,
    fly_way,
    fly_1,
    fly_2,
    fly_3,
    company,
    date,
    meet_start,
    meet_end,
    meet_place,
    money_type,
    money
) {
    const sql = `
        INSERT INTO Weights ($<this:name>)
        VALUES ($<username>, $<kg>, $<dep>, $<arr>, $<fly_way>, $<fly_1>, $<fly_2>, $<fly_3>,
             $<company>, $<date>, $<meet_start>, $<meet_end>, $<meet_place>, $<money_type>, $<money>)
        RETURNING *
    `;
    return db.one(sql, {
        username,
        kg,
        dep,
        arr,
        fly_way,
        fly_1,
        fly_2,
        fly_3,
        company,
        date,
        meet_start,
        meet_end,
        meet_place,
        money_type,
        money
    });
}

function get_weight(username) {
    const sql = `
        SELECT *
        FROM Weights
        WHERE username = $<username>
    `;
    return db.any(sql, {
        username
    });
}

function search_by_num(fly_num, date) {
    const sql = `
        SELECT *
        FROM Weights
        WHERE (fly_1 = $<fly_num> or fly_2 = $<fly_num> or fly_3 = $<fly_num>)
        and date = $<date>
    `;
    return db.any(sql, {
        fly_num,
        date
    });
}

module.exports = {
    store_infor,
    get_weight,
    search_by_num
};