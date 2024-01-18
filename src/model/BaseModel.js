const db = require('../loaders/db');

module.exports = class BaseModel{
    constructor(tableName) {
        this.tableName = tableName;
    }

    getAll(columns){
        let selectedColumns = columns ? columns : ['*'];
        return db(this.tableName).select(selectedColumns);
    }

    getById(id,columns){
        let selectedColumns = columns ? columns : ['*'];
        return db(this.tableName).select(selectedColumns).where({ id }).first();
    }

    create(model){
        return db(this.tableName).insert(model, '*');
    }
}
