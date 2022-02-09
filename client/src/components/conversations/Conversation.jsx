import "./conversation.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id); //The find() method returns the value of the first element in
    // the provided array that satisfies the provided testing function.

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + 
          "https://yt3.ggpht.com/ytc/AKedOLQ2aen5_5_AJ3vHfpz329TCLqcnhPcVMpO7ZbSexg=s900-c-k-c0x00ffffff-no-rj"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
