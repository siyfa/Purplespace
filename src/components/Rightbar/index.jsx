//styles
import "./style.css";

//data
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [people, setPeople] = useState([]);
  const { user: currentuser } = useContext(AuthContext);
  // const [followed, setFollowed] = useState(
  //   currentuser.followings.includes(user?._id)
  // );

  // useEffect(() => {
  //   setFollowed(currentuser.followings.includes(user?._id));
  // }, [currentuser, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (currentuser) {
          const friendList = await axios.get(
            `/users/friends/${currentuser?._id}`
          );
          setFriends(friendList.data);
        }
      } catch (err) {}
    };
    getFriends();
  }, [currentuser, currentuser?._id]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        if (currentuser) {
          const friendList = await axios.get(
            `/users/followers/${currentuser?._id}`
          );
          setFollowers(friendList.data);
        }
      } catch (err) {}
    };
    getFollowers();
  }, [currentuser, currentuser?._id]);
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get(`/users/${currentuser._id}/suggestions`);
        setPeople(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPeople();
  }, [currentuser._id]);

  const HomeRightbar = () => {
    return (
      <>
        <div>
          <div className="suggestion">
            <h4>Suggestions</h4>
            <span>People you may like on Purplespace</span>
            {people.length >= 1 ? (
              people.map((person, index) => (
                <div className="sugesstionContainer" key={index}>
                  <Link to={`/profile/${person.username}`}>
                    <img
                      src={
                        person.profilePicture
                          ? person.profilePicture
                          : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                      }
                      alt=""
                      className="suggestionContainer_image"
                    />
                  </Link>
                  <div className="sugesstionContainer_user">
                    <p className="sugesstionContainer_name">
                      {person.name ? person.name : person.username}
                    </p>
                    <span className="sugesstionContainer_bio">
                      {person.bio}
                    </span>
                    <Link to={`/profile/${person.username}`}>
                      <span className="sugesstionContainer_follow">
                        View profile
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <span
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  display: "block",
                  margin: "20px auto",
                }}
              >
                Come back later Boss
              </span>
            )}
          </div>
        </div>
      </>
    );
  };
  const ProfileRghtbar = () => {
    return (
      <>
        <div className="followingsProfile">
          <h4 className="rigthbar_title">Following</h4>
          {friends.length < 1 && (
            <div className="followingsProfile_no">
              You are not following anybody yet{" "}
            </div>
          )}
          <div className="rightbar_following">
            {friends.map((friend) => (
              <div className="rightbar_followings" key={friend._id}>
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
                        : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                    }
                    alt="following"
                    className="rightbar_followingImage"
                  />
                  <span className="rightbar_followingName">
                    {friend.username}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="followersProfile">
          <h4 className="rigthbar_title">Followers</h4>
          {followers.length < 1 && (
            <div className="followingsProfile_no">
              Nobody is following you yet{" "}
            </div>
          )}
          <div className="rightbar_following">
            {followers.map((friend) => (
              <div className="rightbar_followings" key={friend._id}>
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
                        : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                    }
                    alt="following"
                    className="rightbar_followingImage"
                  />
                  <span className="rightbar_followingName">
                    {friend.username}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbar_wrapper">
        {user ? <ProfileRghtbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
