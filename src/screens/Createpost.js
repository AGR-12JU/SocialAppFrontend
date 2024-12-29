import React from 'react'
import {useState,useEffect} from "react"
import "../css/Createpost.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Createpost() {
    const [body,setBody]=useState("");
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("");
    const navigate=useNavigate();
    const  notifyA=(msg)=>toast.error(msg)
    const  notifyB=(msg)=>toast.success(msg)
    useEffect(()=>{
         // Saving post to mongodb
         if(url)
         {
        fetch("https://socialappbackend-1-k3yi.onrender.com/createPost",{
            method:"post",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
                
            },
            body:JSON.stringify({
                body,
                pic:url
            })

            
        }).then(res=>res.json())
        .then(data=>{if(data.error){
            notifyA(data.error)
        }
            else{
                notifyB("Successfully Posted")
                navigate("/");
            }
             }
        )
        .catch(err=>console.log(err))
    }
    },[url])
    // Posting image to cloudinary
    const postDetails=()=>{
        console.log(body,image)
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","SocialApp")
        data.append("cloud_name","aruj")
        fetch("https://api.cloudinary.com/v1_1/aruj/image/upload",
        {
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>setUrl(data.url))
        .catch(err=>console.log(err))
       
        
    }
    // Function to preview a file.
    const loadfile=(event)=>{
        
            var output = document.getElementById('output');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onload = function() {
              URL.revokeObjectURL(output.src) 
    }}
  return (
    <div className='createPost'>
        <div className='post-header'>
            <h4 style={{margin:"3px auto"}}>Create New Post</h4>
             <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>

        </div>
        <div className='main-div'>
            <img id="output" src="https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png"/>
            <input type="file" accept="image/*" onChange={(event)=>{loadfile(event);setImage(event.target.files[0])}} ></input>
        </div>
        <div className='details'>
            <div className='card-header'>
                <div className='card-pic'>
                    {/* <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt=""/> */}
                </div>
                <h5></h5>
            </div>
            <textarea value={body} onChange={(e)=>
            {setBody(e.target.value)}} type="text" placeholder='Write a caption...'></textarea>
        </div>
    </div>
  )
}

export default Createpost