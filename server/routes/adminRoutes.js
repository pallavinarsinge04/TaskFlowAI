const express=require("express");

const router=express.Router();

const{

getUsers,

deleteUser,

changeRole

}=require("../controllers/adminController");

router.get("/users",getUsers);

router.delete("/users/:id",deleteUser);

router.put("/users/:id",changeRole);

module.exports=router;