import React,{useState,useEffect,useRef} from 'react'

function ProfilePic({changeprofile}) {
    const hiddenFileInput=useRef(null);
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("");
    const postDetails=()=>{
        
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
    const postPic=()=>{
        
       fetch("https://socialappbackend-1-k3yi.onrender.com/uploadProfilePic",{
           method:"put",
           headers:{
               "Content-type":"application/json",
               "Authorization":"Bearer "+ localStorage.getItem("jwt")
               
           },
           body:JSON.stringify({
               
               pic:url
           })

           
       }).then(res=>res.json())
       .then(data=>{
              console.log(data)
              changeprofile();
              window.location.reload();
            }
       )
       .catch(err=>console.log(err))
   
    }
    const handleClick=()=>{
          hiddenFileInput.current.click()
    }
    useEffect(()=>{
        if(image)
        {
       postDetails();
        }
    },[image])
    useEffect(()=>{
        if(url)
        {
           postPic()
        }
    },[url])
  return (
    <div className='profilePic darkBg' >
        <div className='changePic centered'>
            <div>
                <h2>Change Profile Photo</h2>
            </div>
            <div style={{borderTop:"1px solid #00000030"}}>
                <button className='upload-btn' style={{color:"#1EA1F7",}}
                onClick={handleClick}
                >Upload Photo</button>
                <input type="file" ref ={hiddenFileInput} accept='image/*' style={{display:"none"}} onChange={(e)=>{setImage(e.target.files[0])}}></input>
            </div>
            <div style={{borderTop:"1px solid #00000030"}}>
            <button className='upload-btn' style={{color:"#ED4956"}}
            onClick={()=>{
                setUrl(null);
                postPic();
            }}
            >Remove Current Photo</button>
            </div>
            <div style={{borderTop:"1px solid #00000030"}}>
                <button style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px"}} onClick={changeprofile}>Cancel</button>
            </div>
           
        </div>
    </div>
  )
}

export default ProfilePic