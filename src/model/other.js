if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function show_all_users() {
    const sql = `
        SELECT *
        FROM Users
    `;
    return db.any(sql);
}

module.exports = {
    show_all_users
};
