const {Router} =require("express");
const user=require("./userRouter")
const accounts=require("./accounts")
const router=Router();
const authMiddleWare=require("../middleware");
router.use("/user",user)

router.use("/accounts",accounts);



















module.exports=router;