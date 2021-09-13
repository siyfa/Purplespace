//components
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

//styles
import './style.css'

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homecontainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
