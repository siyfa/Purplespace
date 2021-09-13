//styles
import "./style.css";
import { Cancel } from "@material-ui/icons";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
//react
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

export default function Settings() {
  const { user: currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [coverfile, setCoverFile] = useState("");
  const [profilefile, setProfileFile] = useState("");
  const [message, setMessage] = useState("");
  const [deleteAcct, setDeleteAcct] = useState(false);

  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [dob, setDob] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [userData, setUserData] = useState({});
  const profilePicture = useRef();
  const coverPicture = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${currentUser._id}`);
      const userData = res.data[0];
      setName(userData.name);
      setBio(userData.bio);
      setPhoneNumber(userData.phoneNumber);
      setDob(userData.dob);
      setCountry(userData.country);
      setCity(userData.city);
      setUserData(userData);
    };
    fetchUser();
  }, [currentUser._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value) {
      if (confirmPassword.current.value !== password.current.value) {
        console.log(password.current.value, confirmPassword.current.value);
        confirmPassword.current.setCustomValidity("Passwords don't match!");
      }
      const user = {
        password: password.current.value,
        userId: currentUser._id,
      };
      try {
        await axios.put(`/users/${currentUser._id}`, user);
        setMessage("Password succesfully change");
        history.push(`/profile/${currentUser.username}`);
      } catch (err) {
        setMessage("An error has occured");
        console.log(err);
      }
    } else {
      const user = {
        name: name,
        bio: bio,
        phoneNumber: phoneNumber,
        dob: dob,
        country: country,
        city: city,
        userId: currentUser._id,
      };
      if (coverfile) {
        const data = new FormData();
        data.append("file", coverfile);
        data.append("upload_preset", "purplespace");
        data.append("cloud_name", "siyfa");
        try {
          await axios
            .post("https://api.cloudinary.com/v1_1/siyfa/image/upload", data)
            .then((res) => {
              user.coverPicture = res.data.secure_url;
            })
            .catch((err) => console.log(err));
        } catch (err) {
          console.log(err);
        }
      }
      if (profilefile) {
        const data = new FormData();
        data.append("file", profilefile);
        data.append("upload_preset", "purplespace");
        data.append("cloud_name", "siyfa");
        try {
          await axios
            .post("https://api.cloudinary.com/v1_1/siyfa/image/upload", data)
            .then((res) => {
              user.profilePicture = res.data.secure_url;
            })
            .catch((err) => console.log(err));
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await axios.put(`/users/${currentUser._id}`, user);
        setMessage("User profile succesfully saved");
        history.push(`/profile/${currentUser.username}`);
      } catch (err) {
        setMessage("An error has occured");
        console.log(err);
      }
    }
  };
  const deleteAccount = (e) => {
    e.preventDefault();
    setDeleteAcct(!deleteAcct);
  };

  return (
    <>
      <Topbar />
      <div className="settings">
        <Sidebar />
        <div className="settings_wraapperRight">
          {message && (
            <div className="settings_wraapperRightMessage">
              Message: {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="settingsProfile">
              <h3>Profile</h3>
              <div className="settingsProfile_images">
                <div className="settingsProfile_imagesCoverContainer">
                  {coverfile && (
                    <div className="coverImgContainer">
                      <img
                        src={URL.createObjectURL(coverfile)}
                        alt=""
                        className="covershareImg"
                      />
                      <Cancel
                        className="coverCancelImg"
                        onClick={() => setCoverFile(null)}
                      />
                    </div>
                  )}
                  <img
                    src={
                      userData.coverPicture
                        ? userData.coverPicture
                        : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/p53jtag79tyz6dxzytqx.jpg"
                    }
                    alt=""
                    className="settingsProfile_imagesCover"
                  />
                  <label htmlFor="file" className="share_option forCoverImage">
                    <AddAPhotoRoundedIcon
                      htmlColor="white"
                      className="share_optionIcon"
                    />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => setCoverFile(e.target.files[0])}
                      ref={coverPicture}
                    />
                  </label>
                </div>
                <div className="settingsProfile_imagesPictureContainer">
                  {profilefile && (
                    <div className="profileImgContainer">
                      <img
                        src={URL.createObjectURL(profilefile)}
                        alt=""
                        className="pictureshareImg"
                      />
                      <Cancel
                        className="pictureCancelImg"
                        onClick={() => setProfileFile(null)}
                      />
                    </div>
                  )}
                  <img
                    src={
                      userData.profilePicture
                        ? userData.profilePicture
                        : "https://res.cloudinary.com/siyfa/image/upload/v1631479724/Purplespace/yesgaxbc8znpbhz4wfp6.png"
                    }
                    alt=""
                    className="settingsProfile_imagesPicture"
                  />
                  <label
                    htmlFor="pfile"
                    className="share_option forProfileImage"
                  >
                    <AddAPhotoRoundedIcon
                      htmlColor="white"
                      className="share_optionIcon"
                    />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="pfile"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => setProfileFile(e.target.files[0])}
                      ref={profilePicture}
                    />
                  </label>
                </div>
              </div>
              <div className="settingsProfile_username">
                <label>Username</label>
                <input
                  type="text"
                  value={`@${currentUser.username}`}
                  disabled
                />
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="settingsData">
              <h3>User Information</h3>
              <div className="settingsData_wrapper">
                <label>Short bio</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <label>Email</label>
                <input type="email" value={`${currentUser.email}`} disabled />
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  max="2005-11-30"
                  onChange={(e) => setDob(e.target.value)}
                />
                <label>Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="settingsSecurity">
              <h3>Security</h3>
              <div className="settingsSecurity_wrapper">
                <label>Change password</label>
                <input type="password" placeholder="********" ref={password} />
                <label>Confrim password</label>
                <input type="password" ref={confirmPassword} />
                <div className="saveSettings">
                  <label>Save all settings</label>
                  <button type="submit">Save</button>
                </div>
                <div className="accountSettings">
                  {deleteAcct && (
                    <div className="settingsModal">
                      <p>We are not happy to see you leave Boss</p>
                      <p>
                        We still need you here now. Delete feature will be added
                        soon.
                      </p>
                      <p>Thanks</p>
                      {/* <button disabled>Confirm</button> */}
                    </div>
                  )}
                  <label>Delete account</label>
                  <button onClick={deleteAccount}>Delete</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
