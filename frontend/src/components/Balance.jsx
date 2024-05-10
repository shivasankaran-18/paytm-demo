import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export function Balance()
{
    const [amount,setAmount]=useState(0);
    const location=useLocation();
    useEffect(()=>
    {
        axios.get("http://localhost:3000/api/vi/accounts/balance",
            {
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((res)=>
        {
            setAmount(res.data.balance);
        })
    },[location])
    
    return <div className="flex">
        <div className="font-bold text-lg">
            Rs {amount}
        </div>
        <div className="font-semibold ml-4 text-lg">
            
        </div>
    </div>
}