import express from 'express';
import usersRouter from './routes/Users';
import booksRouter from './routes/Books';
import errorHandler from './middlewares/errorHandler';
import config from './config'

const app = express();

config();

const port = process.env.APP_PORT || 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor`);

    app.use('/users', usersRouter)
    app.use('/books', booksRouter)

    app.use((req,res,next) => {
        const error = new Error("Aradığınz sayfa bulunmamaktadır")
        error.status = 404
        next(error)
    })
    app.use(errorHandler)
});

module.exports = app;
