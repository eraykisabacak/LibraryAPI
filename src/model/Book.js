const BaseModel = require('./BaseModel');
const db = require("../loaders/db");

module.exports = class Book extends BaseModel{
    constructor() {
        super('books')
    }

    updateAvailable(id, status){
        return db(this.tableName).update({available:status}).where({id});
    }

    getByIdWithScore(id){
        return db(this.tableName)
            .select(
                db.raw('ROUND(COALESCE(AVG(borrowed_books.score), 0),2) as score')
            )
            .leftJoin('borrowed_books', function() {
                this.on('borrowed_books.book_id', '=', 'books.id');
            })
            .whereNotNull('borrowed_books.score')
            .where('books.id', id)
            .first();
    }
}
