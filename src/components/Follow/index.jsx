//styles
import "./style.css";
import { Add, Remove } from "@material-ui/icons";

//react
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";

export default function Follow({ person }) {
  // const PF = "https://purplespace.herokuapp.com/images/";
  const { user: currentuser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentuser.followings.includes(person?._id)
  );

  useEffect(() => {
    setFollowed(currentuser.followings.includes(person?._id));
  }, [currentuser, person?._id]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + person._id + "/unfollow", {
          userId: currentuser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: person._id });
      } else {
        await axios.put("/users/" + person._id + "/follow", {
          userId: currentuser._id,
        });
        dispatch({ type: "FOLLOW", payload: person._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  return (
    <>
      <div className="peopleWrapper_person">
        <div className="people_person_Image">
          <Link to={`/profile/${person.username}`}>
            <img
              src={
                person.profilePicture
                  ? person.profilePicture
                  : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
              }
              alt=""
              className="personImage"
            />
          </Link>
        </div>
        <div className="peopleWrapper_personInfo">
          <p className="peopleWrapper_person_name">
            {person.name ? person.name : person.username}
          </p>
          <span className="personWrapper_person_bio">{person.bio}</span>
          <button
            className="peopleWrapper_person_follow"
            onClick={followHandler}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        </div>
      </div>
    </>
  );
}
