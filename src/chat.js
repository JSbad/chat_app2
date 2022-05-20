import React from "react";
import useChat from "./useChat.js";
import Contact from "./contact.js";

const Chat = (props) => {
  const { userId } = props.match.params; // Gets userId from URL
  const { messages, sendMessage } = useChat(userId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent
  const [contacts, setContacts] = React.useState([]);
  const [chat, setChat] = React.useState('');

useEffect(() => {
  const fetchContacts = async e => {
    e.preventDefault();
    let contacts = [];
    try {
      let response = await axios.get(`http://localhost:3000/users/${userId}/contacts`);
      if(response.status === 200) {
        //for each contact send a call to get username
        //push into contacts array
        return response.payload;
        let contacts = [];
      }
    } catch(err) {
      console.log(err);
    }
  }
})
  const selectContact = (contact) => {
    setChat(contact);
    console.log(contact);
  }
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-name">{userId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
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