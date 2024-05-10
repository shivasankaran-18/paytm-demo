import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { Toasts } from '../components/Toast';

export const SendMoney = () => {
    const navigate=useNavigate()
    const [amount,setAmount]=useState(0);
    const [search]=useSearchParams();
    const [showTaosts,setShowTaosts]=useState(false);



    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{search.get("name")[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{search.get("name")}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e)=>setAmount(parseInt(e.target.value))}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async ()=>
                        {
                            const response=await axios.post("http://localhost:3000/api/vi/accounts/transfer",
                                {
                                    to:search.get("user"),
                                    amount
                                },
                                {
                                    headers:
                                    {
                                        Authorization:`Bearer ${localStorage.getItem("token")}`
                                    }
                                }
                            )
                            setShowTaosts(true);
                            setTimeout(()=>
                            {
                                setShowTaosts(false);
                        },2000)  
                        }
                    } className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    <button onClick={()=>
                        {
                            navigate("/dashboard")
                        }
                    }className='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white'>
                        Back To DashBoard
                    </button>
                    {showTaosts ?<Toasts></Toasts>:<></>}
                    
                </div>
                </div>
        </div>
      </div>
    </div>
}