var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';
const fetchuser=(req,res,next)=>
{
    //get the user from the jwt token and add id to req ibj
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"plz authenticate using a valid reason"})
    }
    try {
        const data =jwt.verify(token,JWT_SECRET);
        req.user=data.user;
    next();
        
    }
    
    catch (error) {
        res.status(401).send({error:"plz authenticate using a valid reason"})
    }

}
module.exports=fetchuser;