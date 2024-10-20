import jwt from "jsonwebtoken"

const jwtAuth =(req,res,next)=>{
    // 1 read the token
    // console.log(req.headers);
    const token =req.headers['auth'];
    
    // 2 if no token, return the error.
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    // 3.check if the token is valid.
    try{
           const payload= jwt.verify(token,"A6fOPI0G158TnVZVlCD80fgJpI6olg3s")
            req.userID= payload.userID;
            console.log(payload);
    }catch(err){
        // 4. return the error.
        console.log(err);
        return res.status(401).send("Unauthorized stage 2");
    }

    // 5. call next middleware
    next() ;
};
export default jwtAuth;