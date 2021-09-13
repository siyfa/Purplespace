//components
import Profile from "./pages/Profile";
import Home from "./pages/Home/";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/Messenger";
import Settings from "./pages/Settings";
import People from "./pages/People";
import Notifications from "./pages/Notifications";
import ShowPost from "./pages/ShowPost";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/logout">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/messenger">
            {user ? <Messenger /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile/:username">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile/:username/settings">
            {user ? <Settings /> : <Redirect to="/login" />}
          </Route>
          <Route path="/people/suggestions">
            {user ? <People /> : <Redirect to="/login" />}
          </Route>
          <Route path="/notifications">
            {user ? <Notifications /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/posts/:id">
            {user ? <ShowPost /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
