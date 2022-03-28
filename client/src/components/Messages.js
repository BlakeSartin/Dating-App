import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import styledComponents from "styled-components";
import io from "socket.io-client";
import axios from "axios";
import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// import user context
import { userContext } from "../providers/UserProvider";

const Page = styledComponents.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: white;
  flex-direction: column;
`;

const Container = styledComponents.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 2px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;


const TextArea = styledComponents.textarea`
  width: 84%;
  height: 40px;
  border-radius: 10px;
  margin-top: 1px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 2px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styledComponents.button`
  background-color: lightblue;
  width: 15%;
  border: none;
  height: 55px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styledComponents.form`
display:flex;
 flex-direction:row;
  width: 400px;
`;

const MyRow = styledComponents.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styledComponents.div`
  width: 45%;
  background-color: lightblue;
  color: black;
  border: 1px solid lightgray;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-radius:15%;
`;

const PartnerRow = styledComponents(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styledComponents.div`
  width: 45%;
  background-color: lightpink;
  color: black;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-radius:15%;
`;

const Messages = () => {
  const { user } = useContext(userContext);

  const [yourId, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  const roomId = useParams().person;

  useEffect(() => {
    // write if statement to detect if user exists
    if (!user.id) {
      return;
    }
    axios
      .get(`/api/chats/${roomId}/messages`)
      .then((result) => {
        console.log(result.data);
        setMessages(result.data);
      })
      .then(() => {
        socketRef.current = io("localhost:9000");

        socketRef.current.emit("join room", roomId);

        setYourID(user.id);

        socketRef.current.on("message", (message) => {
          receivedMessage(message);
        });
      });
  }, [user.id]);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      message: message,
      conversation_id: roomId,
      user_id: yourId,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
    axios
      .post(`/api/chats/messages`, messageObject)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }
  return (
    <Page>
      <Container>
        {messages.map((message, index) => {
          if (message.user_id === yourId) {
            return (
              <MyRow key={index}>
                <MyMessage>{message.message}</MyMessage>
              </MyRow>
            );
          }
          return (
            <PartnerRow key={index}>
              <PartnerMessage>{message.message}</PartnerMessage>
            </PartnerRow>
          );
        })}
      </Container>
      <Form onSubmit={sendMessage}>
        <TextArea
          value={message}
          onChange={handleChange}
          f
          placeholder={"Say something..."}
        />
        <Button><Send /></Button>
      </Form>
    </Page>
  );
};

export default Messages;
