const {OK, INTERNAL_SERVER_ERROR,CREATED, NOT_FOUND, NO_CONTENT} = require("http-status");

module.exports = class BaseController{
    constructor(name,model) {
        this.name = name
        this.model = model
    }

    async get(req,res){
        try {
            const selectedColumns = req.columns ? req.columns : ['*']
            const getModel = await this.model.getAll(selectedColumns);
            res.status(OK).json(getModel);
        } catch (error) {
            console.error(`Error fetching ${this.name}:`, error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async post(req,res){
        try {
            const newModel = req.body;

            const createdModel = await this.model.create(newModel);

            res.status(NO_CONTENT).json();
        } catch (error) {
            console.error(`Error creating ${this.name}:`, error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    async getById(req,res){
        try {
            const id = req.params.id;

            const getModel = await this.model.getById(id);

            if(!getModel){
                return res.status(NOT_FOUND).send({message:"Böyle bir kayıt yoktur"});
            }

            res.status(OK).json(getModel);
        } catch (error) {
            console.error(`Error creating ${this.name}:`, error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }
    addQuery(req,res,next){
        req.columns = ['id','name']
        next();
    }
}
