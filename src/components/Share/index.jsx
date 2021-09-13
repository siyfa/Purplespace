//styles
import "./style.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
//react
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");

  const desc = useRef();

  const postHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "purplespace");
      data.append("cloud_name", "siyfa");
      try {
        await axios
          .post("https://api.cloudinary.com/v1_1/siyfa/image/upload", data)
          .then((res) => {
            newPost.image = res.data.secure_url;
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts/new", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="share_wrapper">
        <div className="share_top">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
            }
            alt="profile"
            className="share_profileImg"
          />
          <textarea
            className="share_input"
            ref={desc}
            placeholder={`What's on your mind today ${user.username}`}
          ></textarea>
        </div>
        <hr className="share_hr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="share_bottom" onSubmit={postHandler}>
          <div className="share_options">
            <label htmlFor="file" className="share_option">
              <PermMedia htmlColor="teal" className="share_optionIcon" />
              <span className="share_optionText">Add a photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="share_bottomButton" type="submit">
            <SendRoundedIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
