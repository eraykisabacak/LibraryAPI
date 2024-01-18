const UserModel = require('../model/user');
const BaseController = require("./BaseController");
const {NOT_FOUND,NO_CONTENT, INTERNAL_SERVER_ERROR,OK, CREATED} = require("http-status");

module.exports = class UsersController extends BaseController {
    constructor() {
        super('users', new UserModel());
    }

    async getUserAndBooks(req,res,next){
        try{
            const userId = req.params.id
            const user = await this.model.getById(userId, ['id','name'])
            req.user = user
            next();
        }catch (error){
            console.error('Error get user and books:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async checkUser(req,res,next){
        try{
            const userId = req.params.id;

            const getUser = await this.model.getById(userId);

            if(!getUser){
                return res.status(NOT_FOUND).send({message:"Böyle user kayıt yoktur"});
            }
            req.userId = userId
            next();
        }catch (error){
            console.error('Error borrow books check user:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async borrowBook(req,res){
        try{
            res.status(NO_CONTENT).json()
        }catch (error){
            console.error('Error borrow books:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async returnBook(req,res){
        try{
            res.status(NO_CONTENT).json()
        }catch (error){
            console.error('Error borrow books:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }
}

