//using this component in home
import React from 'react';
import "./rightbar.css"
import { Users } from "../../dummyData"; //importing users from dummydata
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Rightbar({user}) { //taking our user prop 

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //to use url inside .env
  const [friends, setFriends] = useState([]); // initiaaly an empty array
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);  // I just need data from response
      } catch (err) {
        console.log(err);
      }
    };
    getFriends(); // we can't use async in useEffect that's why we made a async function and now we are calling it
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };


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
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
          <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue"> {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username} //to go to friend's profile 
              style={{ textDecoration: "none" , color : "white"}}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/6.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
          <img src={`${PF}ad.jpg `}alt="" className="rightbarAd" />
        </div>
         </>
    );
  };
  return (
  <div className='rightbar'>
    <div className="rightbarWrapper">
    {user ? <ProfileRightbar /> : <HomeRightbar />} {/**when we are at our profile page it gonna see that profile is passing a prop so it will 
     * show profileRightbar and if we are at our home page it gonna see that home is not passing any prop so it gonna call homerightbar
     */}
    </div>
  </div>
  );
}
