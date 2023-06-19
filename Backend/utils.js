import jwt from "jsonwebtoken"

export const generateToken = (user)=>{ /* vedio: 30 */
    return jwt.sign({user},process.env.JWT_SECRET,{
        expiresIn: "50d"
    })
}

export const isAuth = (req,res,next)=>{   /* vedio: 45 */
    // console.log("utils");
    const authorization = req.headers.authorization
    // console.log("authorization");
    if(authorization){
        const token = authorization.slice(7,authorization.length)
        // console.log(token);
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err,decode)=>{
                if(err){
                    res.status(401).send({msg:"Invalid Token"})
                }else{
                    req.body.user = decode
                    next()
                }
            }
        )
    }else{
        res.status(401).send({message: "No Token"})
    }
}