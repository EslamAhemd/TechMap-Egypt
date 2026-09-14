const {error}=require("console");
var jwt = require("jsonwebtoken");

const{promisify}=require("util");

const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        
        
        if(!token){
            return res.status(401).json({msg:"U ARE NOT AUTHENTICATED, TOKEN IS NOT PROVIDED"});
        }
        promisify(jwt.verify)(token,"Alaasecretkey267")
        .then((decode)=>{
            if(!decode){
                return res.status(401).json({msg:"TOKEN IS NOT VALID"});
            }  
            console.log(decode);
            req.userSchema = decode;
            next();
        })
        .catch((error)=>{
            console.log("err in verify token",error);
            res.status(500).json({msg:"TOKEN IS NOT VALID",err:error});
        });

    }catch(err){
        console.log("err in isAuthenticated middleware",err);
        res.status(500).json({msg:"INTERNAL SERVER ERROR",err:err});
    }

};

module.exports={isAuthenticated};



