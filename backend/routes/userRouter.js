const {Router}=require("express");
const router =Router();
const zod =require("zod")
const {User,Accounts}=require("../db");
const jwt=require("jsonwebtoken");
const key=require("../config");
const authMiddleWare=require("../middleware");



async function  check1(req,res,next)
{
    const type=zod.object(
        {
            userName:zod.string().email(),
            firstName:zod.string(),
            lastName:zod.string(),
            password:zod.string()
        }
    )
    let result1=type.safeParse(req.body);

    let result2=await User.findOne({userName:req.body.userName});
    if(result1.success && !result2)
    {
        next();
    }
    else
    {
        res.status(402).json({
            msg:"output invalid or user already exists"
        })
    }

}

router.post("/signup",check1,async function(req,res)
{
    const user=await User.create({
        userName:req.body.userName,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
    })
    let userId=user.userName;
    await Accounts.create(
        {
            userId,
            balance:Math.random()*1000+1
        }
    )
   
    res.json(
        {
            msg:"user created",
        }
    )

})

async function check2(req,res,next)
{
    const type=zod.object(
        {
            userName:zod.string(),
            password:zod.string(),
        }
    )
    let result1=type.safeParse(req.body);
    let result2=await User.findOne({userName:req.body.userName});
    if(result1.success && result2)
    {
        next();
    }
    else
    {
        res.status(402).json({
            msg:"output invalid or user does not exists"
        })
    }

}

router.post("/signin",check2,function(req,res)
{
    let token=jwt.sign({userName:req.body.userName},key);
    res.json(
        {
            token
        }
    )


})

const type1=zod.object(
    {
        password:zod.string().optional(),
        firstName:zod.string().optional(),
        lastName:zod.string().optional(),
    }
)

router.post("/",authMiddleWare,async function(req,res)
{
    let result=type1.safeParse(req.body);
    if(result.success)
    {
        await User.updateOne({userName:req.headers.userName},req.body)
        res.json({
            msg:"update successfull",
        })
    }
    else
    {
        res.json({
            msg:"update unsuccessfull",
        })
    }

})



router.get("/bulk",authMiddleWare,async function(req,res)
{
    let filter=req.query.filter || "";
    let temp=await User.find({
        "$or":[{
            firstName:{
                "$regex":filter
            },
        },
        {
            lastName:{
                "$regex":filter,
            }
        }
    ]})

    res.json(
        {
            users:temp.map(function (x)
            {
                if(x.userName!=req.headers.userName)
                {
                    return {
                        userName:x.userName,
                        firstName:x.firstName,
                        lastName:x.lastName
                    }

                }
                return {}
                
            }),

        }
    )
})


















module.exports=router;