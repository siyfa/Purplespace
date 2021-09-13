//styles
import "./style.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { IconButton } from "@material-ui/core";
//react
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ChatOnline from "../../components/ChatOnline";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import Topbar from "../../components/Topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";
import io from "socket.io-client";

export default function Messenger({ own }) {
  const { user } = useContext(AuthContext);
  const [convo, setConvo] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef(io.connect("https://purplespace.herokuapp.com/"));
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io.connect("https://purplespace.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat?.members]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user._id, user.followings]);

  useEffect(() => {
    const getConvo = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConvo(
          res.data.sort((c1, c2) => {
            return new Date(c2.createdAt) - new Date(c1.createdAt);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getConvo();
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
  }, [currentChat?._id]);

  const handlerPost = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );
    if (onlineUsers.includes(receiverId)) {
      //socket
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessages,
      });
    }
    try {
      if (newMessages.length >= 1) {
        const res = await axios.post("/messages", message);
        setMessages([...messages, res.data]);
        setNewMessages("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <Sidebar />
        <div className="chatBox">
          <h3 className="chatBox_title">Messenger</h3>
          <div className="chatBox_Wrapper">
            {currentChat ? (
              <>
                <div className="chatBox_top">
                  <div className="chatBox_back">
                    <IconButton onClick={() => setCurrentChat(null)}>
                      <ArrowBackIcon htmlColor="rgb(87, 1, 87)" />
                    </IconButton>
                  </div>
                  <div className="chatBox_backMessage">
                    {messages.map((message) => (
                      <div ref={scrollRef} key={message._id}>
                        <Message
                          message={message}
                          own={message.sender === user._id}
                          user={user}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chatBox_bottom">
                  <textarea
                    value={newMessages}
                    placeholder="Send a message..."
                    className="chatBox_input"
                    minLength="1"
                    onChange={(e) => setNewMessages(e.target.value)}
                  ></textarea>
                  <button
                    className="chatBox_buttonSubmit"
                    onClick={handlerPost}
                  >
                    <SendOutlinedIcon />
                  </button>
                </div>
              </>
            ) : (
              <div className="chatOnline">
                <div className="chatOnline_Wrapper">
                  <h4>Online friends</h4>
                  <ChatOnline
                    onlineUsers={onlineUsers}
                    currentId={user?._id}
                    setCurrentChat={setCurrentChat}
                  />
                </div>
                <div className="chatMenu_Wrapper">
                  {/* <input
                    type="text"
                    placeholder="Search for friends"
                    className="chatMenu_input"
                  /> */}
                  <h4>Chats</h4>
                  {convo.map((convo, index) => (
                    <div onClick={() => setCurrentChat(convo)} key={index}>
                      <Conversation convo={convo} currentuser={user} />
                    </div>
                  ))}
                </div>
              </div>
              // <span className="chatBox_bottomStartConvo">
              //   Open a conversation to start a chat
              // </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatMenu_Wrapper">
            <h4>Conversations</h4>
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenu_input"
            />
            {convo.map((convo) => (
              <div onClick={() => setCurrentChat(convo)}>
                <Conversation convo={convo} currentuser={user} />
              </div>
            ))}
          </div>
          <div className="chatOnline_Wrapper">
            <h4>Online friends</h4>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
