//styles
import "./style.css";

export default function Online({ user }) {
  // const PF = "https://purplespace.herokuapp.com/images/";
  return (
    <div className="online">
      <li className="rightbar_friendListFriend">
        <div className="rightbar_friendListContainer">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
            }
            alt="friend"
            className="rightbar_friendListFriendImage"
          />
          <span className="rightbar_friendListFriendOnline"></span>
        </div>
        <span className="rightbar_friendListFriendUsername">
          {user.username}
        </span>
      </li>
    </div>
  );
}
