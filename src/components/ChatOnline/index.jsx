// raect
import { useState, useEffect } from "react";
import axios from "../../axios";
//styles
import "./style.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  // const PF = "https://purplespace.herokuapp.com/images/";

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends(0);
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((o, index) => (
        <div
          className="chatOnline_friend"
          onClick={() => handleClick(o)}
          key={index}
        >
          <div className="chatOnline_friendContainer">
            <img
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
              }
              alt=""
              className="chatOnline_friendImg"
            />
            <div className="chatOnline_friendBadge"></div>
          </div>
          <span className="chatOnline_friendName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}
