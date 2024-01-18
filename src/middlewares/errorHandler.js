const { INTERNAL_SERVER_ERROR} = require("http-status");

module.exports = (error,req,res,next) => {
    res.status(error.status || INTERNAL_SERVER_ERROR)
    res.json({
        error:{
            message:error.message || "Internal Server Error"
        }
    })
}
