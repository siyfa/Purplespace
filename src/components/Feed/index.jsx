//components
import Post from "../Post";
import Share from "../Share";

//styles
import "./style.css";
import Spinner from "../Spinner";
import PostAddTwoToneIcon from "@material-ui/icons/PostAddTwoTone";
import { IconButton } from "@material-ui/core";

//react
import { useState, useEffect, useContext } from "react";
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Feed({ username }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get("posts/profile/" + username)
          : await axios.get("posts/timeline/" + user._id);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchPosts();
  }, [user._id, username]);

  const showShare = () => {
    setShareModal(!shareModal);
  };
  return (
    <div className="feed">
      {loading ? (
        <Spinner />
      ) : (
        <div className="feed_wrapper">
          {shareModal && (
            <div className="feed_wrapperShare">
              <Share />{" "}
              <span className="feed_wrapperCancel" onClick={showShare}>
                Cancel
              </span>
            </div>
          )}
          {(!username || username === user.username) && (
            <div className="postModalWrapper" onClick={showShare}>
              <IconButton className="postModalWrapper_icon">
                <PostAddTwoToneIcon htmlColor="white" />
              </IconButton>
            </div>
          )}
          {posts.length < 1 ? (
            <div className="noTimelinePost">
              <h3>Hello {user.username}!</h3>
              <p>
                Welcome to Purplespace, where you can connect with people from
                around the world. Always share your thoughts so people can
                engage with them to help grow your presence on Purplespcae.
              </p>
              <p>
                While you are just here, bear in mind the site will continue to
                experience upgrade in order to better your experience. Please
                bear with us. We hope you enjoy the site.
              </p>
              <h4>
                Clcik <Link to="/people/suggestions">here</Link> to see people
                you may like to follow on Purplespace
              </h4>
            </div>
          ) : (
            <>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  loading={loading}
                  error={error}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
