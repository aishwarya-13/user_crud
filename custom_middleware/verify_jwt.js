const jsonwebtoken = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const jwt = authHeader.split(' ')[1];
        jsonwebtoken.verify(jwt, process.env.JWT_SECRET_SIGNATURE, (err, user)=>{
            if(err){
                res.status(401).render('message', {pageTitle: 'Error', message: err});
                //return res.sendStatus(401);
            }
            if(user){
                req.user = user;
            }
        })
        next();
    }else{
        res.status(401).render('message', {pageTitle: 'Error', message: 'JWT missing!'});
       // res.sendStatus(401);
    } 
}