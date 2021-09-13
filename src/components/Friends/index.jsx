//styles
import "./style.css";

export default function Friend({ user }) {
  // const PF = "https://purplespace.herokuapp.com/images/";

  return (
    <div>
      <li className="sidebar_friend">
        <img
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
          }
          alt="friend"
          className="sidebar_friendImg"
        />
        <span className="sidebar_friendName">{user.username}</span>
      </li>
    </div>
  );
}
