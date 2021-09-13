//styles
import "./styles.css";
import { MoreVert } from "@material-ui/icons";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
//react
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [likeColor, setLikeColor] = useState({});
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data[0]);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    const likeStyle = {
      fontWeight: "800",
      color: "rgb(87, 1, 87)",
    };
    if (isLike) {
      setLikeColor(likeStyle);
    } else {
      setLikeColor({});
    }
  }, [isLike]);

  const likeHandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {}
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };
  const deletePost = async () => {
    try {
      if (post.userId === currentUser._id) {
        await axios.delete(`/posts/${post._id}`, { userId: currentUser._id });
        window.location.reload();
      }
    } catch (err) {}
  };
  const deleteOption = () => {
    if (post.userId === currentUser._id) {
      setCanDelete(!canDelete);
    }
  };
  return (
    <div className="post">
      <div className="post_wrapper">
        <div className="post_top">
          <div className="post_topLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                }
                alt="profile"
                className="post_topLeftImage"
              />
            </Link>
            <span className="post_topLeftUsername">{user.username}</span>
            <span className="post_topLeftDate">{format(post.createdAt)}</span>
          </div>
          <div className="post_topRight">
            <div className="post_topRightIcon" onClick={deleteOption}>
              <MoreVert />
              {canDelete && (
                <div className="post_topRightIconOption">
                  <span onClick={deletePost}>Delete post</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="post_center">
          <span className="post_centerText">{post?.desc}</span>
          {post.image ? (
            <img src={post.image} alt="post" className="post_centerImage" />
          ) : null}
        </div>
        <div className="post_bottom">
          <div className="post_bottom_top">
            <div className="post_bottomLeft">
              <img
                src="https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/kpx48rpk7plf8xgpcd0r.png"
                alt="like"
                className="post_bottomLikeIcon"
                onClick={likeHandler}
              />
              <span className="post_bottomLikeCouter">
                {like} {like > 1 ? "people" : "person"}
              </span>
            </div>
            <div className="post_bottomRight">
              <span className="post_bottomRightComment">
                {post.comments.length} comments
              </span>
            </div>
          </div>
          <div className="post_bottom_buttons">
            <p onClick={likeHandler} style={likeColor}>
              <ThumbUpRoundedIcon />
              Like
            </p>
            <Link to={`/posts/${post._id}`}>
              <p>
                <TextsmsRoundedIcon />
                Comment
              </p>
            </Link>
            <p>
              <ShareRoundedIcon />
              Share
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
