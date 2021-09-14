//styles
import "./style.css";
import Rightbar from "../../components/Rightbar";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { MoreVert } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
//react
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { IconButton } from "@material-ui/core";

export default function ShowPost() {
  const history = useHistory();
  const text = useRef();
  const { user: currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [like, setLike] = useState([]);
  const [comments, setComments] = useState([]);
  const [likeColor, setLikeColor] = useState({});
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const postId = useParams().id;

  useEffect(() => {
    if (Object.keys(post).length !== 0) {
      setIsLike(post?.likes.includes(currentUser._id));
    }
  }, [currentUser._id, post, post?.likes]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        setLike(res.data.likes);
        setComments(
          res.data.comments.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchPost();
  }, [postId]);

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

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {}
    setLike(isLike ? like.length - 1 : like.length + 1);
    setIsLike(!isLike);
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: currentUser._id,
        text: text.current.value,
      };
      const res = await axios.post(`/posts/${post._id}/comments`, data);
      setComments((comments) => [...comments, res.data]);
      text.current.value = "";
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Topbar />
      <div className="showpost">
        <Sidebar />
        <div className="showpost_Wrapper">
          {error && (
            <span
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "13px",
              }}
            >
              An error has occured
            </span>
          )}
          {!loading ? (
            <>
              <div className="showpost_top">
                <IconButton onClick={() => history.goBack()}>
                  <ArrowBackIcon />
                </IconButton>
                <p>{user.username}'s post</p>
                <div></div>
              </div>
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
                  <span className="post_topLeftDate">
                    {format(post.createdAt)}
                  </span>
                </div>
                <div className="post_topRight">
                  <MoreVert className="post_topRightIcon" />
                </div>
              </div>
              <div className="post_center">
                <span className="post_centerText">{post?.desc}</span>
                {post.image ? (
                  <img
                    src={post.image}
                    alt="post"
                    className="post_centerImage"
                  />
                ) : null}
              </div>
              <div className="post_bottom showpost_postBottom">
                <div className="post_bottom_top">
                  <div className="post_bottomLeft">
                    <p
                      onClick={likeHandler}
                      style={likeColor}
                      className="post_bottomLeft_Like"
                    >
                      <ThumbUpRoundedIcon />
                    </p>
                    <span className="post_bottomLikeCouter">
                      {like.length} {like.length > 1 ? "people" : "person"}
                    </span>
                  </div>
                  <div className="post_bottomRight">
                    <span className="post_bottomRightComment">
                      {comments.length}{" "}
                      {comments.length > 1 ? "comments" : "comment"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="commentPost">
                <form onSubmit={postComment}>
                  <input
                    type="text"
                    placeholder={`Comment on ${user.username}'s post`}
                    required
                    className="commentPost_input"
                    ref={text}
                  />
                  <button className="commentPost_send" type="submit">
                    Send
                  </button>
                </form>
              </div>
              <div className="commentWrapper">
                <h4>Comments</h4>
                <div>
                  {comments.map((comment, index) => (
                    <div className="commentWrapper_comment" key={index}>
                      <Link to={`/profile/${comment.user.username}`}>
                        <img
                          src={
                            comment.user.profilePicture
                              ? comment.user.profilePicture
                              : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                          }
                          alt=""
                          className="commentWrapper_commentImage"
                        />
                      </Link>
                      <div className="commentWrapper_commentContainer">
                        <h4 className="commentWrapper_commentName">
                          {comment.user.username}
                        </h4>
                        <p className="commentWrapper_commentText">
                          {comment.text}
                        </p>
                        <span className="commentWrapper_commentDate">
                          {format(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
