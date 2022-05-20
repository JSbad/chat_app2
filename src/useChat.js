import { useEffect, useRef, useState } from "react";
import React from 'react';
import crypto from 'crypto-js';
import { useParams } from "react-router-dom";

const newMsg = "newChatMessage";

const useChat = (user) => {
    const [ws, setWs] = useState(new WebSocket('ws://localhost:8080'));
    const [messages, setMessages] = useState([]);
    const { userId } = useParams();
    const secret = 'testtesttesttest';

    // const encrypt = (string) => { 
    //   return crypto.AES.encrypt(string, secret).toString();
    // };
    // const decrypt = (encryption) => {
    //   let bytes = crypto.AES.decrypt(encryption, secret);
    //   let originalText = bytes.toString(crypto.enc.Utf8);
    //   return originalText;
    // };
useEffect(() => {
    ws.onopen = () => {
        console.log('Websocket Connected');
    }

    ws.onmessage = (message) => {
        const incomingMessage  = {
            message,
            ownedByCurrentUser: message.senderId === userId
        };
        setMessages((messages) => [...messages, incomingMessage]);
    };

    return () => {
        ws.onclose = () => {
            console.log('WebSocket Disconnected');
            // setWs(new WebSocket('ws://localhost:8080'));
        }
    };
    
}, [ws.onmessage, ws.onopen, messages]);
const sendMessage = (msg) => {
    const message = { user: userId, message: msg };
    console.log(message);
    ws.send(JSON.stringify(message));
    console.log(JSON.stringify(message));
    setMessages([message, ...messages]);
};

  return{messages, sendMessage};
};

export default useChat;
