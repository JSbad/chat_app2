import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import useChat from "./useChat.js";
import Contact from "./contact.js";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Chat = (props) => {
  const { userId } = useParams(); // Gets userId from URL
  const { messages, sendMessage } = useChat(userId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent
  const [contacts, setContacts] = React.useState([]);
  const [chat, setChat] = React.useState('');

useEffect(() => {
  (
  async function fetchContacts() {
    try {
    let tempCons = [];
    let response = await axios.get(`http://localhost:3000/users/${userId}/contacts`)
    if(response.status === 200) {
      //push into contacts array
      response.data.payload.forEach(contact => tempCons.push(contact.contact));
    }
    setContacts((contacts) =>[ tempCons]);
  } catch(err) {
    console.log(err);
  }

  // contacts.forEach((contact) => {
  //   const url = `http://localhost:3000/users/${contact}`
  //   console.log(url);
  // })
}
  )()
}, [contacts]);

  const selectContact = (contact) => {
    setChat(contact);
    console.log(contact);
  }
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-name">hello, {localStorage.getItem('username')}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body} messages go here
            </li>
          ))}
        </ol>
      </div>
      <div className='contact-list'>{contacts}</div>
      <input
        type='text'
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Chat;