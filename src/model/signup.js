if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function check_username(username) {
    const where = username ? `WHERE username = '$1:value'` : '';
    const sql = `
        SELECT *
        FROM Users
        ${where}
    `;
    return db.any(sql, [username]);
}

function create_account(username, email, password, passportnumber) {
    const sql = `
        INSERT INTO Users ($<this:name>)
        VALUES ($<username>, $<email>, $<password>, $<passportnumber>)
        RETURNING *
    `;
    return db.one(sql, {
        username,
        email,
        password,
        passportnumber
    });
}

module.exports = {
    create_account,
    check_username
};