import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
export const EnterPage = ({ socket }) => {
    //Username of user
    const [username, setUsername] = useState("");
    const [allUsers, setUsers] = useState([]);
    const navigate = useNavigate();

    //Updates username state
    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    //When user clicks Enter Chat
    const onEnter = () => {
        socket = io("http://localhost:5000");
        socket.emit("add-user", username);
        console.log("Success user Added!");
        localStorage.setItem("username", username);
        navigate("/chat");
        
    }



    return (


        

        <div className="flex justify-center bg-blue-500">

            <div className="bg-blue-500">
                <div class="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
                    <div class="text-slate-100 items-center">
                        <div class="text-center pb-3">Welcome back!</div>
                    </div>

                    <div class="w-full md:w-3/4  lg:w-1/2 flex flex-col items-center bg-slate-50 rounded-md pt-12">
                  
                        <div class="w-3/4 mb-6">
                            <input type="text" onChange={handleChange} value={username} name="username" id="username" class="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300" placeholder="Enter a chat name..."/>
                </div>
                            
                    
                                
                                <div class="w-3/4 mb-12">
                            <button onClick={onEnter} type="submit" class="py-4 bg-blue-500 w-full rounded text-blue-50 font-bold hover:bg-blue-700">Enter Chat Room</button>
                                </div>
                            </div>
                            <div class="flex justify-center container mx-auto mt-6 text-slate-100 text-sm">

                            </div>
                        </div>


                    </div>


        </div>

        
        )
}