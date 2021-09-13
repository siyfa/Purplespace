//styles
import "./style.css";
//
import { useRef } from "react";
//
import axios from "../../axios";
import { useHistory, Link } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const name = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="register">
      <div className="registerBackground">
        <div className="register_left">
          <h1 className="register_leftLogo">Purplespace</h1>
          <div className="register_leftInfo">
            <p>Connect with people from around the world</p>
            <p>
              And stay <span>CONNECTED</span>
            </p>
          </div>
        </div>
      </div>
      <div className="register_wrapper">
        <h1 className="register_wrapperLogo">Purplespace</h1>
        <div className="register_right">
          <h4>Sign Up</h4>
          <form className="register_rightBox" onSubmit={submitHandler}>
            <label className="register_rightBoxLabel">Enter Username</label>
            <input
              type="text"
              placeholder="Username"
              ref={username}
              required
              className="register_rightBoxInput"
            />
            <label className="register_rightBoxLabel">Enter Fullname</label>
            <input
              type="text"
              placeholder="Fullname"
              ref={name}
              required
              className="register_rightBoxInput"
            />
            <label className="register_rightBoxLabel">
              Enter Email Address
            </label>
            <input
              type="email"
              placeholder="Email"
              ref={email}
              required
              className="register_rightBoxInput"
            />
            <label className="register_rightBoxLabel">Enter Password</label>
            <input
              type="password"
              placeholder="Password"
              ref={password}
              required
              className="register_rightBoxInput"
              minLength="6"
            />
            <label className="register_rightBoxLabel">Repeat Password</label>
            <input
              type="password"
              placeholder="Confrim Password"
              ref={confirmPassword}
              required
              className="register_rightBoxInput"
            />
            <button className="register_rightBoxButton" type="submit">
              Sign Up
            </button>
            <span className="register_rightBoxForgot">
              Already have an account?
            </span>
            <button className="register_rightBoxNewAccount">
              <Link to="/login">Login</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
