//styles
import "./style.css";
import { CircularProgress } from "@material-ui/core";
//
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
export default function Login() {
  const username = useRef();
  const password = useRef();

  const { loading, error, dispatch } = useContext(AuthContext);

  const loginHangler = (e) => {
    e.preventDefault();
    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
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
          <h4>Login</h4>
          {error && (
            <div className="loginError">
              <span>
                User does not exist. Please make sure your username and password
                are correct.
              </span>
            </div>
          )}
          <form className="register_rightBox" onSubmit={loginHangler}>
            <label className="register_rightBoxLabel">Enter Username</label>
            <input
              type="text"
              placeholder="Username"
              className="register_rightBoxInput"
              ref={username}
              required
            />
            <label className="register_rightBoxLabel">Enter Password</label>
            <input
              type="password"
              placeholder="Password"
              className="register_rightBoxInput"
              ref={password}
              minLength="6"
              required
            />
            <button
              className="register_rightBoxButton"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span>
                  Login... <CircularProgress color="primary" size="20px" />
                </span>
              ) : (
                "Log In"
              )}
            </button>
            <span className="register_rightBoxForgot">
              Already have an account?
            </span>
            <button className="register_rightBoxNewAccount" disabled={loading}>
              <Link to="/register">
                {loading ? (
                  <span>
                    Login... <CircularProgress color="primary" size="20px" />
                  </span>
                ) : (
                  "Create New Account"
                )}
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
