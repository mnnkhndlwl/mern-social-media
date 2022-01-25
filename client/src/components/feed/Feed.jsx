import {useState, useEffect} from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css"
import axios from "axios";

export default function Feed({username}) { //this username is gonna decide whether we are in profile or homepage

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("posts/timeline/" );//+ user._id);
    setPosts(res.data);
    };
    fetchPosts();
  }, [username]); //runs only on the first render because we hae provided empty array as an dependency
  
  return (
    <div className="feed">
    <div className="feedWrapper"> {/**whenever anything chnages inside this useEffect will render it again */}
        <Share />
       {posts.map(p=>( //for each post i am gonna send our post component
          <Post key={p._id} post={p}/> //inside this post component i am gonna send a single post and as we are using map so each post should have a unique key which is our id
        //_id mongodb me hai isliye ise change kiya id se _id
      ))} 
      </div>
      </div>
    );
}
