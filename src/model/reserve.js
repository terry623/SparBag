if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function store_relation(lend, borrow, weight_id) {
    const sql = `
        INSERT INTO Reserve ($<this:name>)
        VALUES ($<lend>, $<borrow>, $<weight_id>)
        RETURNING *
    `;
    return db.one(sql, {
        lend,
        borrow,
        weight_id
    });
}

module.exports = {
    store_relation
};