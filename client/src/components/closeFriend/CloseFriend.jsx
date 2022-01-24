import "./closeFriend.css";

export default function CloseFriend({user}) {  //passing our user as parameter
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}