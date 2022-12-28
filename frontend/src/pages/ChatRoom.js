import { ChatInput } from "../components/ChatInput";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";




export const ChatRoom = () => {
    //This state contains all messages
    const [messages, setMessages] = useState();
    const navigate = useNavigate();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = io("http://localhost:5000");
    const scrollRef = useRef();

    //Makes sure user has a username
    useEffect(() => {
        if (!localStorage.getItem("username")) {
            navigate("/");
        }
    }, []);


    //Get all messages from chat
    const getPrevMessages = async () => {
        const res = await axios.get("http://localhost:5000/api/messages/getAllMessages", {

        }).catch(err => console.log(err));

        await setMessages(res.data.all_messages);
    }

    //Happens on first render using the function to grab all messages
    useEffect(() => {
        getPrevMessages();
    }, [])


    //On "msg-recieve" we will set the newest arrival message to the recent message just recieved. 
    useEffect(() => {
        socket.on("msg-recieve", (data) => {
            setArrivalMessage({ name: data.name, message: data.message });
        });
    }, []);

    //Adds arrival message to the messages state by using the setMessages function, this only happens when arrivalMessage is changed.
    useEffect(() => {
        function newArrivalMessage() {
            arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
        }


        newArrivalMessage();
    }, [arrivalMessage]);

    //This will automatically scroll down for the user when a message is recieved.
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    //Handles sending the message to the chat room using the API.
    const handleSendMsg = async (msg, name) => {
        const res = await axios.post(`http://localhost:5000/api/messages/addMessage`, {
            name: name,
            message: msg,
        }).catch(err => console.log(err));

        //Emits the data(message content) to socket
        socket.emit("send-msg", {
            name: name,
            message: msg
        });

        const msgs = [...messages];

        setMessages(msgs);

        const data = await res.data;

        return data;

    }
    

    if (messages) {


        return (

            <div className="flex justify-center bg-blue-500" id="chat-page">

                <div className="auto-mx">


                    <div className="chat-messages">

                        {messages?.map((message) => {
                            return (
                                <div ref={scrollRef}>
                                    <div
                                        className={`message ${message.name === localStorage.getItem("username") ? "sended" : "recieved"
                                            }`}
                                    >
                                        {message.name}
                                        <div className="content ">
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>



                    <ChatInput handleSendMsg={handleSendMsg} className="chat-input sticky bg-blue-500" />

                </div>



            </div>

        );



    } else {
        return (

            <div className="flex justify-center" id="chat-page">

                <h1>Loading Messages...</h1>

            </div>
            
            )
    }
}