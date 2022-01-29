import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"

export default function Home() {
  return (
    <>
      <Topbar /> {/**using our topbar component */}
      <div className="homeContainer">
        <Sidebar /> {/**using our sidebar component */}
        <Feed /> {/**using feed component */}
         <Rightbar/> {/**using rightbar component */}
         
      </div>
    </>
  );
}