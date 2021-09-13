import "./style.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Rightbar from "../../components/Rightbar";
import { useEffect, useState, useContext } from "react";
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../components/Spinner";
import Follow from "../../components/Follow";

export default function People() {
  const { user } = useContext(AuthContext);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    const fetchPeople = async () => {
      try {
        const res = await axios.get(`/users/${user._id}/suggestions`);
        setPeople(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchPeople();
  }, [user._id]);
  return (
    <>
      <Topbar />
      <div className="people">
        <Sidebar />
        <div className="peopleWrapper">
          <h3>People you may follow</h3>
          {loading ? (
            <Spinner />
          ) : (
            <div className="peopleWrapper_container">
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
              {people.length >= 1 ? (
                people.map((person, index) => (
                  <Follow person={person} key={index} />
                ))
              ) : (
                <span
                  style={{
                    margin: "20px auto",
                    textAlign: "center",
                    fontSize: "13px",
                  }}
                >
                  Come back later Boss
                </span>
              )}
            </div>
          )}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
