import {useState} from "react";
import { MoreVert } from "@material-ui/icons";
import "./post.css"
import {Users} from "../../dummyData" //importing Users from our dummy data

export default function Post({post}) { //passing our posts 
  const [like, setLike] = useState(post.like); 
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1) //if isLiked true then decrease like otherwise increase like
    setIsLiked(!isLiked) //isLiked is gonna be totally opposite of it's previous value
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username} {/**if user id equals to post id then return username from users array in dummydata*/}
              </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
                <MoreVert/>
          </div>
        </div>
        <div className="postCenter">
            <span className="postText">
                {post?.desc}  {/**using question mark as some posts don't have description */}
            </span>
            <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
              <img className="likeIcon" src="./assets/like.png" onClick={likeHandler} alt=""></img> {/**on click it goona call likehandler function */}
              <img className="likeIcon" src="./assets/heart.png" onClick={likeHandler} alt=""></img>
              <span className="postLikeCounter">{like} Likes</span> {/**like from use state */}
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} Comments</span>
            </div>
        </div>
      </div>
    </div>
  );
}
