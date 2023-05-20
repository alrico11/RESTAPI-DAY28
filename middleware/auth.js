function auth(req,res,next){
    const authHeader = req.header('Authorization');
    const key = 'abcdefghijklmnopqrstuvwxyz'
    if (authHeader == key){
        // res.status(401)
        next();
    
    }else{
        res.status(401)
        res.send({
            message:'unauthorized'
        })
    }
   
}

module.exports = auth;