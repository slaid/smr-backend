"use strict";
let promise = require('bluebird');
let options = {
    promiseLib: promise
};
let pgp = require('pg-promise')(options);
let connectionString = 'postgres://postgres:123456789@localhost:5432/SMR';
let db = pgp(connectionString);

module.exports = {
    database: db
};