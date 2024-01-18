const request = require('supertest');
const app = require('../index');

describe('User Endpoints', () => {
    // GET /users
    it('should get all users', async () => {
        const res = await request(app)
            .get('/users');
        expect(res.statusCode).toEqual(200);
    })

    // GET /users/:id
    it('should get user by id', async () => {
        const res = await request(app)
            .get('/users/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.user.id).toEqual(1);
    });
})

describe('Book Endpoints', () => {
    // GET /books
    it('should get all books', async () => {
        const res = await request(app)
            .get('/books');
        expect(res.statusCode).toEqual(200);
    })

    // GET /books/:id
    it('should get book by id', async () => {
        const res = await request(app)
            .get('/books/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    })
})
