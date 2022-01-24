import React from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css"
import {Posts} from "../../dummyData" //importing posts from our dummy data

export default function Feed() {
  return (
    <div className="feed">
    <div className="feedWrapper">
      <Share/>
      {Posts.map(p=>( //for each post i am gonna send our post component
          <Post key={p.id} post={p}/> //inside this post component i am gonna send a single post and as we are using map so each post should have a unique key which is our id
      ))}
      </div>
      </div>
    );
}
