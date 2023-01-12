const jwt=require('jsonwebtoken')


exports.authenticateJWT=(req,res,next)=>{
    const token=req.cookies.token
     
    if(!token)
    {
        return res.status(401).json({errorMessage:"No token.Authorization denied"})
    }

    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        req.user= decode.user
        next();
    } catch (error) {
      res.status(401).json({errorMessage:"Invalid token"})  
    }
}