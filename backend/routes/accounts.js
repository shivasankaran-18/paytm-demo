const {Router}=require("express");
const authMiddleWare = require("../middleware");
const router=Router()
const {User,Accounts} =require("../db");
const mongoose = require("mongoose");



router.get("/balance",authMiddleWare,async function(req,res)
{

    let user=await User.findOne({userName:req.headers.userName})
    console.log(user);
    let acc=await Accounts.findOne(
        {
            userId:user.userName,
        }
    )
    console.log(acc);
    res.json(
        {
            balance:acc.balance,
        }
    )
})

router.post("/transfer",authMiddleWare,async function(req,res)
{
    const session=await mongoose.startSession();

     session.startTransaction()

    const {amount,to}=req.body;
    const from_user=await Accounts.findOne({userId:req.headers.userName}).session(session);
    if(amount>from_user.balance)
    {
        await session.abortTransaction();
        return res.status(402).json({
            msg:"insufficient balance",
        })
    }

    let to_user=await Accounts.findOne({userId:to}).session(session);
    if(!to_user)
    {
        await session.abortTransaction();
        return res.status(402).json({
            msg:"receiver does not exist"
        })
    }

    await Accounts.updateOne({userId:from_user.userId},{"$inc":{balance:-amount}}).session(session)
    await Accounts.updateOne({userId:to},{"$inc":{balance:amount}}).session(session);


    await session.commitTransaction();
    return res.json({
        msg:"transaction completed"
    })
})




















module.exports=router;

