const {apiKey}=require("../constants/apiKey");
function apiKeyCheck(req,res,next){
    const apiKeyUsed=req.headers["api_key"];
    if(apiKeyUsed===apiKey){
        console.log(apiKeyUsed);
        console.log("Valid api Key");
        next()
    }else{
        console.log(apiKeyUsed);
        console.log(apiKeyUsed===apiKey);
        console.log("Invalid Api Key");
        res.status(500).json({"status":"Fail","msg":"No valid api Key Used"});
        return;
    }

}

module.exports={apiKeyCheck};