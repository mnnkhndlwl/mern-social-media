import {useState,useEffect} from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router";
import axios from 'axios';

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //to use url inside .env
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar /> {/**using our topbar component */}
      <div className="profile">
        <Sidebar /> {/**using our sidebar component */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "post/1.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/6.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
        <Feed username={username}/> {/**using feed component and passing username prop to feed*/}
          {/**using rightbar component */}
         <Rightbar user={user}/> {/**now this user prop is gonna indicate whether our rightbar is in profile page or home page */}
          </div>
        </div>
      </div>
    </>
  );
}
