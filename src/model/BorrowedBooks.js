const BaseModel = require('./BaseModel');
const db = require("../loaders/db");
const moment = require('moment');

module.exports = class BorrowedBooks extends BaseModel{
    constructor() {
        super('borrowed_books')
    }

    getByUserIdAndBookId(userId, bookId){
        return db(this.tableName)
            .where('user_id',userId)
            .where('book_id',bookId)
            .where('returned_at', null)
            .first();
    }

    updateBorrowBook(userId, bookId, score){
        const dateStr = moment().utc().format();
        return db(this.tableName)
            .where('user_id',userId)
            .where('book_id',bookId)
            .whereNull('returned_at')
            .update('returned_at', dateStr)
            .update('score', score);
    }

    getByUserIdAndReturned(userId){
        return db(this.tableName)
            .select(
                'books.name as book_name',
                db.raw('COALESCE(ROUND(AVG(borrowed_books.score) OVER (PARTITION BY borrowed_books.book_id),2),0) as score')
            )
            .join('books', 'books.id', 'borrowed_books.book_id')
            .join('users', 'users.id', 'borrowed_books.user_id')
            .where('users.id', userId)
            .whereNotNull('borrowed_books.returned_at')
            .orderBy('borrowed_books.returned_at', 'ASC');
    }

    getByUserIdAndNotReturned(userId){
        return db(this.tableName)
            .select(
                'books.name as book_name',
                db.raw('COALESCE(ROUND(AVG(borrowed_books.score) OVER (PARTITION BY borrowed_books.book_id),2),0) as score')
            )
            .join('books', 'books.id', 'borrowed_books.book_id')
            .join('users', 'users.id', 'borrowed_books.user_id')
            .where('users.id', userId)
            .whereNull('borrowed_books.returned_at')
            .orderBy('borrowed_books.returned_at', 'ASC');
    }

}
