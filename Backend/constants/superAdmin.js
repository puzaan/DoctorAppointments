const {apiKey}=require("./apiKey");
const superusername="superAdmin";
const superpassword="testme@123";

const superAdminUser={
    "emailId":"superAdmin@gmail.com",
    "fullName":"Super Admin",
    "token":apiKey
}



module.exports={superusername,superpassword,superAdminUser};