//styles
import "./style.css";
//react
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Rightbar from "../../components/Rightbar";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import axios from "../../axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Notifications() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/users/${user._id}/notifications`);
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
    return () => {
      setNotifications({});
    };
  }, [user._id]);
  return (
    <>
      <Topbar />
      <div className="notifications">
        <Sidebar />
        <div className="notificationsWrapper">
          <h4>All Notifications</h4>
          {notifications?.length >= 1 ? (
            notifications?.map((notification) => (
              <div
                className="notificationsWrapper_container"
                key={notification._id}
              >
                <Link to={`/profile/${notification.username}`}>
                  <img
                    src={
                      notification.profilePicture
                        ? notification.profilePicture
                        : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                    }
                    alt=""
                    className="notificationsWrapper_containerImage"
                  />
                </Link>
                <p className="notificationsWrapper_containerName">
                  <span>{notification.username}</span> {notification.type}
                </p>
                <span className="notificationsWrapper_containerTime">
                  {format(notification.createdAt)}
                </span>
              </div>
            ))
          ) : (
            <div className="notificationsWrapper_no">
              You do not have any notification for now{" "}
            </div>
          )}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
