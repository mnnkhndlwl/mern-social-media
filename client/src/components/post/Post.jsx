import {useState , useEffect,useContext} from "react";
import { MoreVert } from "@material-ui/icons";
import "./post.css"
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export default function Post({post}) { //passing our posts 
  const [like, setLike] = useState(post.likes.length); 
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext); //use this user as current user

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`); //api se user fetch kiya get user tum dekh sakte ho user route me
    setUser(res.data); //phir wo user yaha gya
    };
    fetchUser();
  }, [post.userId]); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //to use url inside .env

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}> {/**To go to profile page on clicking user profileimg */}
            <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/6.jpg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
              {currentUser.username} 
              </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
                <MoreVert/>
          </div>
        </div>
        <div className="postCenter">
            <span className="postText">
                {post?.desc}  {/**using question mark as some posts don't have description */}
            </span>
            <img className="postImg" src={PF + post.img} alt="" /> {/**using our public folder*/}
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
              <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt=""></img> {/**on click it goona call likehandler function */}
              <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt=""></img>
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
