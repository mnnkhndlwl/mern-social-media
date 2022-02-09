import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";
import axios from "axios";
import io from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]); //initial state will be an empty array
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext); //user ko lane ke liye
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    setSocket(io("ws://localhost:8900"));  //indicates our socket server url
  }, []);

  console.log(socket);

  useEffect(() => {
    //whenever we are gonna refresh the page it gonna fetch all the conversations from our current user
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("/messages",message);
      setMessages([...messages, res.data]);
      setNewMessage(""); //after sending new message we want our inputarea to be empty
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {  //after sending new message we want our chats to automatically scroll down
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />{" "}
                {/**for each conversation i am returning this conversation component and this conversation as prop */}
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>send</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
