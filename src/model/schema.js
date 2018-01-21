require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    DROP TABLE IF EXISTS Users;
    DROP TABLE IF EXISTS Weights;

    CREATE TABLE Users (
        id              serial PRIMARY KEY NOT NULL,
        "username"      varchar(30) NOT NULL,
        "email"         varchar(30) NOT NULL,
        "password"      varchar(30) NOT NULL,
        "passportnumber" varchar(30) NOT NULL
    );

    CREATE TABLE Weights (
        id              serial PRIMARY KEY NOT NULL,
        "user"      varchar(30) NOT NULL,
        "kg"            integer,
        "dep"           varchar(30) NOT NULL,
        "arr"           varchar(30) NOT NULL,
        "fly_way"       varchar(30) NOT NULL,
        "fly_1"         varchar(30) NOT NULL,
        "fly_2"         varchar(30) NOT NULL,
        "fly_3"         varchar(30) NOT NULL,
        "company"       varchar(30) NOT NULL,
        "date"          varchar(30) NOT NULL,
        "meet_start"    varchar(30) NOT NULL,
        "meet_end"      varchar(30) NOT NULL,
        "meet_place"    varchar(30) NOT NULL,
        "money_type"    varchar(30) NOT NULL,
        "money"         integer
    );
`;

db.none(schemaSql).then(() => {
    console.log('Schema Create!');
    pgp.end();
}).catch(err => {
    console.log('Error Creating Schema!', err);
});