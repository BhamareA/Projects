import UserModel from "../features/user/user.model.js";


const basicAuthorizer=(req,res,next)=>{
    // 1. check if authorixation header is empty .

    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send("No authrization details found");
    }
    console.log(authHeader);

    // 2 extract the credentials [Basic hlkghnshrwlkaj]

    const base64Credentials = authHeader.replace('Basic', " ");
    console.log(base64Credentials);

    //  3 decode credentials

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.group(decodedCreds); // [username;password]

    const creds =decodedCreds.split(':');

    const user =UserModel.getAll().find(u=> u.email==creds[0] && u.password==creds[1]);
    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;