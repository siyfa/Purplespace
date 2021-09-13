//components
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

//styles
import "./style.css";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Add, Remove } from "@material-ui/icons";
//
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import { IconButton } from "@material-ui/core";

export default function Profile() {
  const history = useHistory();
  const { user: currentuser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const username = useParams().username;
  const [followed, setFollowed] = useState(
    currentuser.followings.includes(user?._id)
  );

  useEffect(() => {
    setFollowed(currentuser.followings.includes(user?._id));
  }, [currentuser, user?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      setUser(res.data[0]);
      setFollowers(res.data[0].followers.length);
      setFollowings(res.data[0].followings.length);
    };
    fetchUser();
  }, [username]);
  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentuser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentuser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };
  const handleMessage = async () => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentuser._id}/${user._id}`
      );
      history.push("/messenger");
      if (res.data === null) {
        const body = { senderId: currentuser._id, receiverId: user._id };
        await axios.post(`conversations`, body);
        history.push("/messenger");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profile_right">
          <div className="profile_rightTop">
            <div className="profile-rightTopCover">
              <img
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/p53jtag79tyz6dxzytqx.jpg"
                }
                alt="cover"
                className="profile_rightTopCoverImage"
              />
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                }
                alt="profile"
                className="profile_rightTopUserImage"
              />
              <div className="profile_rightButtons">
                {currentuser.username === user.username ? (
                  <Link to={`/profile/${user.username}/settings`}>
                    <button className="profile_rightEdit">Edit Profile</button>
                  </Link>
                ) : (
                  <div className="profileFollowMessage">
                    <div className="profileMessage">
                      <IconButton onClick={handleMessage}>
                        <EmailIcon
                          htmlColor="rgb(87, 1, 87)"
                          fontSize="medium"
                        />
                      </IconButton>
                    </div>
                    <button className="rightbar_follow" onClick={followHandler}>
                      {followed ? "UnFollow" : "Follow"}
                      {followed ? <Remove /> : <Add />}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="profile_rightTopInfo">
              <h4 className="profile_rightTopInfoName">{user.name}</h4>
              <h4 className="profile_rightTopInfoUsername">@{user.username}</h4>
              <span className="profile_rightTopInfoDesc">{user.bio}</span>
              {user.country || user.city ? (
                <p className="profile_rightTopInfoLocation">
                  <LocationOnIcon className="locationBarge" /> {user.country},{" "}
                  {user.city}
                </p>
              ) : null}
              <p className="profile_rightTopInfoFollow">
                <span>
                  <strong>{followers}</strong> Followers
                </span>
                <span>
                  <strong>{followings}</strong> Following
                </span>
              </p>
            </div>
          </div>
          <h3 className="timeline">Timeline</h3>
          <div className="profile_rightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
