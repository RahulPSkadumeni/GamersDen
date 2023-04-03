import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatContainer from "../../components/ChatContainer/Chat/ChatContainer";
import Contact from "../../components/Contact/Contact";
import HeaderComponent from "../../components/HeaderComponent";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import "./chat.css";
import { userChats } from "../../api/chatApi/chatRequest";
import { Controller } from "react-hook-form";
import Conversation from "../../components/conversation/Conversation.js";
import NavIcons from "../../components/NavIcons/NavIcons";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";

// import Contact from "../../components/ChatContainer/contact/Contact";

export default function Chat() {
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      console.log("sending messages from client");
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  //onlone user status
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    // <div>
    //   <HeaderComponent />
    //   <body className="Chat ">
    //     <Contact />
    //     <ChatContainer className />
    //   </body>
    //   {/* <div className="flex  bg-teal-600">
    //     <Contact />
    //     <ChatContainer />
    //   </div> */}
    // </div>

    <div className="Chat overflow-y-scroll no-scrollbar x-scroll no-scrollbar bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-500 ... ">
      {/* Left Side */}
      <div className="Left-side-chat bg-gradient-to-r from-pink-300 via-purple-300">
        <LogoSearch />
        <div className="overflow-hidden p-4 mt-5 ">
          <h2 className="chats text-white flex flex-col  h-screen p-4 rounded-3xl bg-gradient-to-r from-green-400 to-blue-500">
            Chats
            <div className="mt-3 Chat-list ">
              {chats.map((chat) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </h2>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", display: "flex", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
}
