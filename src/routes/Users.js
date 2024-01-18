const express = require('express');
import validate from '../middlewares/validate';
import UsersValidations from '../validations/Users';
import BorrowedBooksValidations from '../validations/BorrowedBooks';
import UsersController from '../controllers/UsersController';
import BooksController from '../controllers/BooksController';
import BorrowedBooksController from '../controllers/BorrowedBooksController';

const router = express.Router();

const userController = new UsersController();
const booksController = new BooksController();
const borrowedBooksController = new BorrowedBooksController();

router.get("/",
    userController.addQuery.bind(userController),
    userController.get.bind(userController)
);
router.post("/",
    validate(UsersValidations.createValidation),
    userController.post.bind(userController)
);
router.get("/:id",
    userController.checkUser.bind(userController),
    userController.getUserAndBooks.bind(userController),
    borrowedBooksController.getBorrowBookByUserId.bind(borrowedBooksController),
);
router.post("/:id/borrow/:bookId",
    userController.checkUser.bind(userController),
    booksController.checkBook.bind(booksController),
    booksController.changeBookFalseAvailable.bind(booksController),
    borrowedBooksController.create.bind(borrowedBooksController),
    userController.borrowBook.bind(userController)
);
router.post("/:id/return/:bookId",
    validate(BorrowedBooksValidations.returnBookValidation),
    borrowedBooksController.isReturned.bind(borrowedBooksController),
    booksController.changeBookTrueAvailable.bind(booksController),
    borrowedBooksController.returnBookFromDB.bind(borrowedBooksController),
    userController.returnBook.bind(userController)
);

module.exports = router;
