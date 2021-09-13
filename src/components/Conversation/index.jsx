//react
import { useEffect, useState } from "react";
import axios from "../../axios";
//styles
import "./style.css";

export default function Conversation({ convo, currentuser }) {
  // const PF = "https://purplespace.herokuapp.com/images/";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = convo.members.find((m) => m !== currentuser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users/?userId=" + friendId);
        setUser(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [convo.members, currentuser._id]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? user.profilePicture
            : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
