import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import io from "socket.io-client";
import { useCurrentUserContext } from "../context/CurrentUserContext";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:3005"); // Replace with your server URL

function ChatApp() {
  const { currentUser } = useCurrentUserContext();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [emailId, setEmailId] = useState();
  const [newUser, setNewUser] = useState(true);
  const [isChangeName, setChangeName] = useState(false);
  const location= useLocation()
  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages([...messages, message]);
    });
    
   console.log(location.state)

    socket.on("user connected", (user) => {
      console.log(user);
      setOnlineUsers([...onlineUsers, user]);
    });

    socket.on("user disconnected", (user) => {
      setOnlineUsers([...onlineUsers, user]);
    });

    // Clean up the event listeners when the component unmounts.
    return () => {
      socket.off("chat message");
      socket.off("user connected");
      socket.off("user disconnected");
    };
  }, [messages, onlineUsers]);

  const sendMessage = () => {
    
    const receiver = onlineUsers.filter((user) => user.id !== currentUser.id);
    // console.log(receiver)
    axios
      .post("http://localhost:8080/api/chat/create", {
        message: newMessage,
        senderID: currentUser.id,
        receiverID: location.state.id===currentUser.id?receiver[0].id:location.state.id
        // receiverID: location.state.id
      })
      .then((response) => {
        console.log(response.data.data);
      });
      
    socket.emit("chat message", newMessage, emailId);
    setNewMessage("");
  };

  const addUser = () => {
    setEmailId(currentUser.emailId)
    console.log(currentUser)
    socket.emit("user connected", { emailId: currentUser.emailId, id: currentUser.id });
    setNewUser(false)
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 15,
          pb: 4,
        }}
      >
        {newUser?<Button onClick={addUser}>Start Chatting</Button>:
        <>
        <div id="onlineUsers">
          Online:
          <ul>
            {onlineUsers.map((user, index) => (
              <li key={index}>
                {emailId === user.emailId
                  ? `${user.emailId} - you`
                  : user.emailId}
              </li>
            ))}
          </ul>
        </div>

        <ul id="messages">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <TextField
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <br />
        <Button onClick={sendMessage}>Send</Button></>}
      </Box>
    </>
  );
}

export default ChatApp;
