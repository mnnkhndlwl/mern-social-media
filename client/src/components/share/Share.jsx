//usimg this share component inside feed
import React from "react";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import "./share.css"

export default function Share() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //to use url inside .env
  
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={`${PF}person/1.jpg`} alt="" className="shareProfileImg" />
          <input placeholder="What's in your mind?" className="shareInput" />
        </div>
        <hr className="shareHr"></hr>
        <div className="shareBottom">
          <div className="shareOptions">
              <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon"/>
                  <span className="shareOptionText">Photo or Video</span>
              </div>
              <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
