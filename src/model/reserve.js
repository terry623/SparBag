if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function store_relation(weight_id, lend, borrow, ask_time, ask_kg) {
    const sql = `
        INSERT INTO Reserve ($<this:name>)
        VALUES ($<weight_id>, $<lend>, $<borrow>, $<ask_time>, $<ask_kg>)
        RETURNING *
    `;
    return db.one(sql, {
        weight_id,
        lend,
        borrow,
        ask_time,
        ask_kg
    });
}

function search_reserve(lend, borrow, weight_id) {

    const sql = `
        SELECT *
        FROM Reserve
        WHERE lend = $<lend> and borrow = $<borrow> and weight_id = $<weight_id>
    `;
    return db.any(sql, {
        lend,
        borrow,
        weight_id
    });
}

module.exports = {
    store_relation,
    search_reserve
};