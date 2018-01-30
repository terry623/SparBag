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

function store_article(about_me, check_item, rule_1, rule_2, username) {

    if (check_item == "需要")
        check_item = true;
    else
        check_item = false;
        
    const sql = `
        UPDATE Users
        SET about_me = $<about_me>, check_item = $<check_item>, rule_1 = $<rule_1>, rule_2 = $<rule_2>
        WHERE username = $<username>
        RETURNING *
    `;

    return db.one(sql, {
        about_me,
        check_item,
        rule_1,
        rule_2,
        username
    });
}

module.exports = {
    create_account,
    check_username,
    store_article
};