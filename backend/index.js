const express = require("express");
const cors=require("cors")
const app=express();
const userRouter=require("./routes/index");


app.use(express.json());
app.use(cors());
app.use("/api/vi",userRouter)










app.listen(3000,()=>
{
    console.log("listening");
})