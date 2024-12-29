import React from 'react'
import "../css/PostDetail.css"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function PostDetail({item,toggleDetails}) {
  var picLink="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
  const [pic,setPic]=useState([]);
  const [user,setUser]=useState([]);
    const navigate=useNavigate();
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const removePost=(postId)=>{
        if(window.confirm("Do you really want to delete this post ?"))
        {

        
        fetch(`https://socialappbackend-1-k3yi.onrender.com/deletePost/${postId}`,{
            method:"delete",
            headers:{
          
                Authorization:"Bearer "+ localStorage.getItem("jwt")
               }


        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            setPic(result.post)
            setUser(result.user)
            toggleDetails();
            navigate("/");
            notifyB(result.message);
        })
    }
    }
    
  return (
    <div className='showComment'>
    <div className='container'>
  <div className='postPic'>
    <img src={item.photo} alt=""></img></div>
    <div className='details'>
    <div className='card-header' style={{borderBottom:"1px solid #00000029"}}>
          <div className='card-pic'>
            <img src={user.Photo? user.Photo : picLink} alt=""/>
          </div>
          <h5>{item.postedBy.name}</h5>
          <div className='deletePost' onClick={()=>removePost(item._id)}>
          <span className="material-symbols-outlined">
           Delete
         </span>

          </div>
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
        
          </span>
          <input type="text" placeholder='Add a Comment'
        //   value={comment} onChange={(e)=>{setComment(e.target.value)}}
          >
          
          </input>
          <button className="comment"
        //    onClick={()=>{makeComment(comment,item._id); toggleComment(); notifyB("Comment Added")}}
          >Post</button>
          </div>
    </div>

  </div>
   <div className='close-comment' onClick={()=>{toggleDetails()}}>
   <span className="material-symbols-outlined material-symbols-outlined-comment">
    
   </span>   
   </div>
    </div>
  )
}

export default PostDetail