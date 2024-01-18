const BorrowedBookModel = require('../model/BorrowedBooks');
const BaseController = require("./BaseController");
const {CREATED, INTERNAL_SERVER_ERROR,OK, NOT_FOUND} = require("http-status");

module.exports = class BooksController extends BaseController{
    constructor() {
        super('borrowed_books', new BorrowedBookModel());
    }

    async create(req,res,next){
        try{
            req.createdBorrowedBook = await this.model.create({
                user_id:req.userId,
                book_id:req.bookId,
            });
            next();
        }catch (error){
            console.error('Error creating borrowed book:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async returnBookFromDB(req,res,next){
        try{
            req.returnedBook = await this.model.updateBorrowBook(
                req.userId,
                req.bookId,
                req.body.score
            );

            next();

        }catch (error){
            console.error('Error returning book:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async isReturned(req,res,next){
        try{
            let userId = req.params.id;
            let bookId = req.params.bookId;
            let borrowBook = await this.model.getByUserIdAndBookId(userId,bookId);
            if(!borrowBook){
                return res.status(NOT_FOUND).send({message:"Herhangi verilecek kitap bulunamadı."});
            }
            req.bookId = bookId
            req.userId = userId
            req.borrowBook = borrowBook
            next()
        }catch (error){
            console.error('Error isreturned book:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async getBorrowBookByUserId(req,res){
        try{
            let userId = req.params.id;
            let pastBook = await this.model.getByUserIdAndReturned(userId)
            let presentBook = await this.model.getByUserIdAndNotReturned(userId)
            res.status(OK).json({user: req.user,past:pastBook,present:presentBook})
        }catch (error){
            console.error('Error getBorrowBookByUserId:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }


}


