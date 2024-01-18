const BookModel = require('../model/Book');
const BaseController = require("./BaseController");
const {NOT_FOUND, INTERNAL_SERVER_ERROR, OK} = require("http-status");

module.exports = class BooksController extends BaseController{
    constructor() {
        super('books', new BookModel());
    }
    async checkBook(req,res,next){
        try{
            const bookId = req.params.bookId;

            const getBook = await this.model.getById(bookId);

            if(!getBook){
                return res.status(NOT_FOUND).send({message:"Böyle bir kitap yoktur"});
            }
            if(!getBook.available){
                return res.status(NOT_FOUND).send({message:"Kitap şuan mevcut değildir."});
            }
            req.bookId = bookId
            next();
        }catch (error){
            console.error('Error borrow books check book:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async changeBookFalseAvailable(req,res, next){
        try{
            await this.model.updateAvailable(req.bookId, false);
            next();
        }catch (error){
            console.error('Error borrow books check book:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async changeBookTrueAvailable(req,res, next){
        try{
            await this.model.updateAvailable(req.bookId, true);
            next();
        }catch (error){
            console.error('Error borrow books check book:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async getBookWithScore(req,res){
        try {
            let id = req.params.id
            const getBook = await this.model.getById(id,['id','name'])

            if(!getBook){
                return res.status(NOT_FOUND).send({message:"Böyle bir kayıt yoktur"});
            }
            let data = await this.model.getByIdWithScore(id)
            getBook.score = data.score
            res.status(OK).json(getBook);
        }catch (error){
            console.error('Error get books with score:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }
}


