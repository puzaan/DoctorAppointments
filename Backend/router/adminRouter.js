const express = require('express');
const {createAdmin}=require("../controller/admin/create");
const {viewAllAdmin}=require("../controller/admin/viewAll");
const {viewAdminById}=require("../controller/admin/viewById");
const {updateAdminById,adminPasswordChange}=require("../controller/admin/update");
const {deleteAdminById}=require("../controller/admin/delete");
const adminRoute=express.Router();

adminRoute.post("/create",createAdmin);

adminRoute.get("/view/all",viewAllAdmin);

adminRoute.get("/view/:id",viewAdminById);

adminRoute.put("/update/:id",updateAdminById);

//admin password change
adminRoute.put("/change/password/:id",adminPasswordChange);

adminRoute.delete("/delete/:id",deleteAdminById);


module.exports={adminRoute}