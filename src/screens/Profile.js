import React,{useEffect,useState} from 'react'
import "../css/Profile.css"
import PostDetail from '../Components/PostDetail';
import ProfilePic from '../Components/ProfilePic';

function Profile() {
  var picLink="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
  const [pic,setPic]=useState([]);
  const [show,setShow]=useState(false);
  const [posts,setPosts]=useState([]);
  const [user, setUser] = useState("")
  const [changePic,setChangePic]=useState(false)
  const toggleDetails=(posts)=>{
    if(show){
      setShow(false);
    }
    else{
      setShow(true);
      setPosts(posts);

    }

}
const changeprofile=()=>{
  if(changePic)
  {
  setChangePic(false)
  }
  else
  {
    setChangePic(true)
  }
}

  useEffect(()=>{
    fetch(`https://socialappbackend-1-k3yi.onrender.com/user/${JSON.parse(localStorage.getItem("user"))._id}`, 
      {
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then((res)=>res.json())
    .then((result)=>{
      setPic(result.post)
      setUser(result.user)
    })
  },[])
  return (
    <div className='profile'>
      <div className='profile-frame'>
      <div className='profile-pic'>
        <img onClick={changeprofile} src={user.Photo? user.Photo : picLink} alt=""/> 
      </div>
      <div className='profile-data'>
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        <div className='profile-info' style={{display:"flex"}}>
        <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
        </div>
      </div>
    </div>
    <hr style={{
      width:"90%",
      
      opacity:"0.8",
      margin:"25px auto"
    }}/>
    <div className='gallery'>
      {pic.map((pic)=>{
        return <img key={pic._id} src={pic.photo} 
        onClick={()=>{toggleDetails(pic)}}
        className='item'></img>
      })}
    </div>
    {show &&
       <PostDetail item={posts} toggleDetails={toggleDetails}/>
    }
    {
      changePic && 
      <ProfilePic changeprofile={changeprofile}/>
    }
    
    </div>
  )
}

export default Profile