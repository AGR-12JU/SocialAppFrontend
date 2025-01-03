import React,{useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom";
import "../css/Home.css"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
function Home() {
  var picLink="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
  const navigate=useNavigate();
  const [data,setData]=useState([])
  const [comment,setComment]=useState("")
  const [show,setShow]=useState(false);
  const [item,setItem]=useState([]);
  
  const [pic,setPic]=useState([]);
  
  
  const [user, setUser] = useState("")
  const  notifyA=(msg)=>toast.error(msg)
  const  notifyB=(msg)=>toast.success(msg)
  useEffect(()=>{
    const token=localStorage.getItem("jwt");
    if(!token)
    {
      navigate("./signup");
    }
    fetch("https://socialappbackend-1-k3yi.onrender.com/allposts",{
         headers:{
          
          Authorization:"Bearer "+ localStorage.getItem("jwt")
         }
    }).then(res=>res.json())
    
    .then(result=>setData(result))
    .catch(err=>console.log(err))
  },[])
  const toggleComment=(posts)=>{
      if(show){
        setShow(false);
      }
      else{
        setShow(true);
        setItem(posts);

      }

  }

  const likePost=(id)=>{
    fetch("https://socialappbackend-1-k3yi.onrender.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const unlikePost=(id)=>{
    fetch("https://socialappbackend-1-k3yi.onrender.com/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const makeComment=(text,id)=>{
    fetch("https://socialappbackend-1-k3yi.onrender.com/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text:text,
        postId: id,

      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        console.log(result);
      });
  }
  return (
    <div className='home'>
      {data.map((posts)=>{
          return (
            <div className='card'>
            <div className='card-header'>
              <div className='card-pic'>
                <img src={posts.postedBy.Photo? posts.postedBy.Photo : picLink} alt=""/>
              </div>
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>
                {posts.postedBy.name}
                </Link>
                
              </h5>
            </div>
            <div className='card-image'>
              <img src={posts.photo } alt=""/>
            </div>
            <div className='card-content'>
            {posts.likes.includes(
                JSON.parse(localStorage.getItem("user"))?._id
              ) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    unlikePost(posts._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(posts._id);
                  }}
                >
                  favorite
                </span>
              )}
           
             
             <p>{posts.likes.length} Likes</p>
             <p>{posts.body}</p>
             <p style={{fontWeight:"bold",cursor:"pointer"}}
             onClick={()=>{toggleComment(posts)}}>View all comments</p>
            </div>
            <div className='add-coment'>
            <span className="material-symbols-outlined">
            
              </span>
              <input type="text" placeholder='Add a Comment'
              value={comment} onChange={(e)=>{setComment(e.target.value)}}>
              
              </input>
              <button className="comment" onClick={()=>{makeComment(comment,posts._id)}}>Post</button>
              </div>
          </div>
          )
      })}
      {show && (
      <div className='showComment'>
        <div className='container'>
      <div className='postPic'>
        <img src={item.photo} alt=""></img></div>
        <div className='details'>
        <div className='card-header' style={{borderBottom:"1px solid #00000029"}}>
              <div className='card-pic'>
                {/* <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt=""/> */}
              </div>
              <h5>{item.postedBy.name}</h5>
            </div>
          <div className='comment-section' style={{borderBottom:"1px solid #00000029"}}>
            {
              item.comments.map((comment)=>{
                return(
                
                  <p className='comm'>
                  <span className='commenter' style={{fontWeight:"bolder"}}>{comment.postedBy.name} </span>
                  <span className='commentText'>{comment.comment}</span>
    
                </p>
                )
              })
            }
             
                
           
          </div>

          <div className='card-content'>
            
             
             <p>{item.likes.length} Likes</p>
             <p>{item.body}</p>
            </div>
            <div className='add-coment'>
            <span className="material-symbols-outlined">
            mood
              </span>
              <input type="text" placeholder='Add a Comment'
              value={comment} onChange={(e)=>{setComment(e.target.value)}}>
              
              </input>
              <button className="comment"
               onClick={()=>{makeComment(comment,item._id); toggleComment(); notifyB("Comment Added")}}
              >Post</button>
              </div>
        </div>

      </div>
       <div className='close-comment' onClick={()=>{toggleComment()}}>
       <span className="material-symbols-outlined material-symbols-outlined-comment">
        close
       </span>   
       </div>
        </div>)
      } 

      </div>
    
  )
}

export default Home