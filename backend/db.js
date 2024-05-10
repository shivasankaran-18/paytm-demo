const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://shiva18:01234567890123@cluster0.hxwolox.mongodb.net/paytm");

const schema1=new mongoose.Schema(
    {
        userName:String, 
        firstName:String,
        lastName:String,
        password:String,
    }
)

const schema2=new mongoose.Schema(
    {
        userId:{
            type:String,
            ref:"User",
            required:true,
        },
        balance:Number,
    }
)

const User=mongoose.model("User",schema1);
const Accounts=mongoose.model("Accounts",schema2);


module.exports={User,Accounts};