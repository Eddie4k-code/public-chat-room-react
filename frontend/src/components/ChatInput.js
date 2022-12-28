import { useState } from "react";

export const ChatInput = ({ handleSendMsg }) => {


    const [msg, setMsg] = useState("");



    //Changes the state of msg
    const handleMessage = (e) => {
        setMsg(e.target.value);
    }


    //Checks length of msg and sends it.
    const sendChat = (e) => {
        e.preventDefault();
        let name = localStorage.getItem("username");
        if (msg.length > 0) {
            handleSendMsg(msg, name);
            setMsg('');
        }
    }

    return (<div className="max-w-md mx-auto" id="chat-input">

        <form onSubmit={(e) => sendChat(e)}>
        <input
                class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
                value={msg}
                onChange={handleMessage}
            />
        </form>



    </div>)
}