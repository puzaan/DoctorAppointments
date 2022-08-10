const emailChecker=require("email-existence");

const mailValidator=(req,res,next)=>{
    const email=req.body["email"];
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(email)){
        next();
    }else{
        res.status(200).json({"status":"Fail","data":"Invalid Email!"})
    }
}

module.exports={mailValidator}