import "./message.css";
import {format} from "timeago.js";

export default function Message({message,own}) { //taking a prop form messanger
  return (
    <div className={own ? "message own" : "message"}>  
      <div className="messageTop">
      <img
          className="messageImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxOggQ-o-GaMFkE7bNW5x_WH5_kLogAOiBA&usqp=CAU"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
  </div>
    );
}
