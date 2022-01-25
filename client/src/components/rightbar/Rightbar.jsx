//using this component in home
import React from 'react';
import "./rightbar.css"
import { Users } from "../../dummyData"; //importing users from dummydata
import Online from "../online/Online";

export default function Rightbar({profile}) { //taking our profile prop 

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //to use url inside .env

  const HomeRightbar = () => {
    return (
      <>
      <div className="birthdayContainer">
      <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Manan Khandelwal</b> and <b>3 other friends</b> have a birhday today.
          </span>
      </div>
      <img src={`${PF}ad.jpg `}alt="" className="rightbarAd" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
      {Users.map((u) => (   //for each user i'm gonna return online component and passing our user
            <Online key={u.id} user={u} />
          ))}
      </ul>
      </>
      );
    };

    const ProfileRightbar = () => {
      return (
        <>
          <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/1.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/2.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/3.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/4.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/5.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/6.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <img src={`${PF}ad.jpg `}alt="" className="rightbarAd" />
        </div>
         </>
    );
  };
  return (
  <div className='rightbar'>
    <div className="rightbarWrapper">
    {profile ? <ProfileRightbar /> : <HomeRightbar />} {/**when we are at our profile page it gonna see that profile is passing a prop so it will 
     * show profileRightbar and if we are at our home page it gonna see that home is not passing any component so it gonna call homerightbar
     */}
    </div>
  </div>
  );
}
