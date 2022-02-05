import "./message.css";

export default function Message({own}) { //taking a prop form messanger
  return (
    <div className={own ? "message own" : "message"}>  
      <div className="messageTop">
      <img
          className="messageImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxOggQ-o-GaMFkE7bNW5x_WH5_kLogAOiBA&usqp=CAU"
          alt=""
        />
        <p className="messageText">Or chacha</p>
      </div>
      <div className="messageBottom"></div>
  </div>
    );
}
