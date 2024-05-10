
import { Header } from "../components/Header";
import { SubHeading} from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup()
{
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
  


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Header label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setUserName(e.target.value);
        }} placeholder="xyz@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick=
          {async function()
            {
                
                let result=await axios.post("http://localhost:3000/api/vi/user/signup",
                    {
                        userName,
                        firstName,
                        lastName,
                        password
                    }
                )
                navigate("/signin")

                
            }
          }label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
    
}