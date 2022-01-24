import React from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
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
                src="assets/post/3.jpg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">manan</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
        <Feed/> {/**using feed component */}
          {/**using rightbar component */}
         <Rightbar profile/> {/**now this profile prop is gonna indicate whether our rightbar is in profile page or home page */}
          </div>
        </div>
      </div>
    </>
  );
}
