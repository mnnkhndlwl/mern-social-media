import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxOggQ-o-GaMFkE7bNW5x_WH5_kLogAOiBA&usqp=CAU"
            alt=""
            className="chatOnlineImg"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Roman Empire</span>
      </div>
    </div>
  );
}
