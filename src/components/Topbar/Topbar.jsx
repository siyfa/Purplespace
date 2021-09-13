//styles
import "./Topbar.css";
import {
  RssFeed,
  Event,
  HelpOutline,
  Bookmark,
  Group,
  PlayCircleFilledOutlined,
  Chat,
} from "@material-ui/icons";
import { Search } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import SettingsPowerRoundedIcon from "@material-ui/icons/SettingsPowerRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
//data
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
//react
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logOut } from "../../apiCalls";
import { useState, useContext, useEffect } from "react";
import axios from "../../axios";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const [notification, setNottification] = useState([]);
  const [menuBar, setMenuBar] = useState(false);

  const handleMenu = () => {
    setMenuBar(!menuBar);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users/?userId=${user._id}`);
      const unread = res.data[0].unRead.length;
      setNottification(unread);
    };
    fetchData();
  }, [user._id]);
  return (
    <>
      <div className="container">
        <div className="left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Purplespace</span>
          </Link>
        </div>
        <div className="center">
          <div className="menuIcon">
            <div className="menuButton">
              <Link to="/">
                <IconButton>
                  <HomeRoundedIcon className="menuIcon" />
                </IconButton>
              </Link>
            </div>
            <div className="menuButton">
              <Link to="/notifications">
                <IconButton>
                  <NotificationsRoundedIcon className="menuIcon" />
                </IconButton>
                {notification > 0 ? (
                  <span className="iconBarge">{notification}</span>
                ) : null}
              </Link>
            </div>
            <div className="menuButton">
              <Link to="/messenger">
                <IconButton>
                  <ChatRoundedIcon className="menuIcon" />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="menuBarIcon">
          <IconButton onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          {menuBar ? (
            <div className="menuBarSidebar">
              <div className="sidebar_wrapper">
                <ul className="sidebar_list">
                  <li
                    className="sidebar_listItems menuTop"
                    onClick={handleMenu}
                  >
                    <div>
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
                    </div>
                    <IconButton onClick={handleMenu}>
                      <CancelIcon className="menuBarSidebar_menuBar" />
                    </IconButton>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <Link to="/">
                      <RssFeed className="sidebar_icon" />
                      <span className="sidebar_listItemsText">Feed</span>
                    </Link>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <Link to="/messenger">
                      <Chat className="sidebar_icon" />
                      <span className="sidebar_listItemsText">Chat</span>
                    </Link>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <Link to={`/profile/${user.username}/settings`}>
                      <SettingsRoundedIcon className="sidebar_icon" />
                      <span className="sidebar_listItemsText">Settings</span>
                    </Link>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <Link to={`/people/suggestions`}>
                      <PersonAddRoundedIcon className="sidebar_icon" />
                      <span className="sidebar_listItemsText">People</span>
                    </Link>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <PlayCircleFilledOutlined className="sidebar_icon" />
                    <span className="sidebar_listItemsText">Videos</span>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <Group className="sidebar_icon" />
                    <span className="sidebar_listItemsText">Groups</span>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <Bookmark className="sidebar_icon" />
                    <span className="sidebar_listItemsText">Bookmarks</span>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <HelpOutline className="sidebar_icon" />
                    <span className="sidebar_listItemsText">Questions</span>
                  </li>
                  <li className="sidebar_listItems" onClick={handleMenu}>
                    <Event className="sidebar_icon" />
                    <span className="sideb_listItemsText" ar>
                      Events
                    </span>
                  </li>
                  <li
                    className="sidebar_listItems menuBar_logout"
                    onClick={handleMenu}
                  >
                    {user && (
                      <span className="sideb_listItemsText" ar>
                        <Link
                          to={`/logout`}
                          className="logout"
                          onClick={() => {
                            logOut(dispatch);
                          }}
                        >
                          <SettingsPowerRoundedIcon className="sidebar_icon" />
                          Logout
                        </Link>
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mobileNavbar">
        <div className="center">
          <div className="menuIcon">
            <div className="menuButton">
              <Link to="/">
                <IconButton>
                  <HomeRoundedIcon htmlColor="white" />
                </IconButton>
              </Link>
            </div>
            <div className="menuButton">
              <Link to="/notifications">
                <IconButton>
                  <NotificationsRoundedIcon htmlColor="white" />
                </IconButton>
                {notification > 0 ? (
                  <span className="iconBarge">{notification}</span>
                ) : null}
              </Link>
            </div>
            <div className="menuButton">
              <Link to="/messenger">
                <IconButton>
                  <ChatRoundedIcon htmlColor="white" />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
