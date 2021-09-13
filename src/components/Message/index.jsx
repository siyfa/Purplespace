//styles
import "./style.css";
import { format } from "timeago.js";

export default function Message({ message, own, user }) {
  // const PF = "http://localhost:5000/images/";
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message_top">
        {/* <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : PF + "profilePicture.png"
          }
          alt=""
          className="message_topImg"
        /> */}
        <p className="message_topText">{message.text}</p>
      </div>
      <div className="message_bottom">{format(message.createdAt)}</div>
    </div>
  );
}
