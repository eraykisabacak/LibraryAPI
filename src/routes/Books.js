import validate from "../middlewares/validate";

const express = require('express');
import BooksController from '../controllers/BooksController';
import BooksValidations from "../validations/Books";

const router = express.Router();

const booksController = new BooksController();

router.get("/",
    booksController.addQuery.bind(booksController),
    booksController.get.bind(booksController)
);
router.post("/",
    validate(BooksValidations.createValidation),
    booksController.post.bind(booksController)
);
router.get("/:id",
    booksController.getBookWithScore.bind(booksController)
);

module.exports = router;
