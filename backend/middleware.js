const jwt=require('jsonwebtoken')
const key=require("./config");


function authMiddleWare(req,res,next)
{

    let token=req.headers.authorization.split(' ')[1];

    try
    {
        let temp=jwt.verify(token,key);
        req.headers.userName=temp.userName;
  
        next();


    }
    catch(err)
    {
        res.status(401).json(
            {
                msg:"invalid user",
            }
        )
    }

}

module.exports=authMiddleWare