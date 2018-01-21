if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function store_infor(
    user,
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
        VALUES ($<user>, $<kg>, $<dep>, $<arr>, $<fly_way>, $<fly_1>, $<fly_2>, $<fly_3>,
             $<company>, $<date>, $<meet_start>, $<meet_end>, $<meet_place>, $<money_type>, $<money>)
        RETURNING *
    `;
    return db.one(sql, {
        user,
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

module.exports = {
    store_infor
};