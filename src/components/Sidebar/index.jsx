//styles
import "./styles.css";
import {
  RssFeed,
  Event,
  HelpOutline,
  Bookmark,
  Group,
  PlayCircleFilledOutlined,
  Chat,
} from "@material-ui/icons";
import SettingsPowerRoundedIcon from "@material-ui/icons/SettingsPowerRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
//react
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logOut } from "../../apiCalls";

export default function Sidebar() {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebar_wrapper">
        <ul className="sidebar_list">
          <li className="sidebar_listItems">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                }
                alt="profile"
                className="topbarImg"
              />
            </Link>
            <span className="sidebar_listItemsText name">
              {user.name ? user.name : user.username}
            </span>
          </li>
          <li className="sidebar_listItems">
            <Link to="/">
              <RssFeed className="sidebar_icon" />
              <span className="sidebar_listItemsText">Feed</span>
            </Link>
          </li>
          <li className="sidebar_listItems">
            <Link to="/messenger">
              <Chat className="sidebar_icon" />
              <span className="sidebar_listItemsText">Chat</span>
            </Link>
          </li>
          <li className="sidebar_listItems">
            <Link to={`/profile/${user.username}/settings`}>
              <SettingsRoundedIcon className="sidebar_icon" />
              <span className="sidebar_listItemsText">Settings</span>
            </Link>
          </li>
          <li className="sidebar_listItems">
            <Link to={`/people/suggestions`}>
              <PersonAddRoundedIcon className="sidebar_icon" />
              <span className="sidebar_listItemsText">People</span>
            </Link>
          </li>
          <li className="sidebar_listItems">
            <PlayCircleFilledOutlined className="sidebar_icon" />
            <span className="sidebar_listItemsText">Videos</span>
          </li>
          <li className="sidebar_listItems">
            <Group className="sidebar_icon" />
            <span className="sidebar_listItemsText">Groups</span>
          </li>
          <li className="sidebar_listItems">
            <Bookmark className="sidebar_icon" />
            <span className="sidebar_listItemsText">Bookmarks</span>
          </li>
          <li className="sidebar_listItems">
            <HelpOutline className="sidebar_icon" />
            <span className="sidebar_listItemsText">Questions</span>
          </li>
          <li className="sidebar_listItems">
            <Event className="sidebar_icon" />
            <span className="sidebar_listItemsText">Events</span>
          </li>
        </ul>
        <hr className="sidebar_hr" />
        {user && (
          <div className="logginOff">
            <SettingsPowerRoundedIcon className="sidebar_icon" />
            <Link
              to={`/logout`}
              className="logout"
              onClick={() => {
                logOut(dispatch);
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
