const BaseModel = require('./BaseModel');

module.exports = class User extends BaseModel{
    constructor() {
        super('users')
    }
}
