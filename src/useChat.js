import { useEffect, useRef, useState } from "react";
import WebSocket from 'ws';

const newMsg = "newChatMessage";

const useChat = (userId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    socketRef.current = ws;

    socketRef.current.on(newMsg, (message) =>{
        const incomingMessage  = {
            ...message,
            ownedByCurrentUser: message.senderId === socketRef.current.id
        };
        setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
        socketRef.current.close();
    };
}, [userId]);

const sendMessage = (messageBody) => {
    socketRef.current.send(newMsg, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return(messages, sendMessage);
};

export default useChat;
