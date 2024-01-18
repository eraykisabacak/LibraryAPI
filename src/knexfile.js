const {join} = require("path");
require('dotenv').config({path:join(__dirname,'../.env')});

console.dir(process.env.DB_USERNAME);
console.dir(process.env.DB_PASSWORD);

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://postgres:postgres123@localhost/library',
        migrations: {
            directory: `${__dirname}/db/migrations`
        },
        seeds: {
            directory: `${__dirname}/db/seeds`
        }
    }
};
