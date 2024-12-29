import React from 'react'
import logo from "../img/SocialApp.jpg"
import '../css/SignUp.css'
import {Link,useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
function SignUp() {
      const navigate=useNavigate()
      const [name,setName]=useState("");
      const [email,setEmail]=useState("");
      const [userName,setuserName]=useState("");
     
      const [password,setPassword]=useState("");
      const  notifyA=(msg)=>toast.error(msg)
      const  notifyB=(msg)=>toast.success(msg)
      const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

      const postData=()=>{
        // Checking email
        if(!emailRegex.test(email))
        {
           notifyA("Invalid Email");
           return;
        }
        else if(!passRegex.test(password))
        {
          notifyA("The password must be of minimum length 8 and has minimum of 1 uppercase 1 lowercase 1 numeric character and 1 special character");
          return;
        }

      //  Sending data to server
        fetch("https://socialappbackend-1-k3yi.onrender.com/signup",{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name:name,
            userName:userName,
            email:email,
            password:password
          })
        }).then(res=>res.json())
        .then(data=>{
          if(data.error)
          {
            notifyA(data.error)
         
          }
          else{
            notifyB(data.message)
            navigate("/signin")
          }
         console.log(data)})
        
      }
      


     
  return (
    <div className='signUp'>
        <div className='form-container'>
            <div className='form'>
            <img className='signUpLogo' src={logo} alt=""></img>
          <p className='loginPara'  style={{ fontSize: "12px", margin: "3px 0px" }}> 
             Sign Up to SocialApp
          </p>
          <div>
             <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}></input>
          </div>
          <div>
             <input type='text' name='name' id='name' value={name} placeholder='Name'
             onChange={(e)=>{setName(e.target.value)}}></input>
          </div>
          <div>
             <input type='text' name='username' id='username' value={userName}placeholder='Username' onChange={(e)=>{setuserName(e.target.value)}}></input>
          </div>
          <div>
             <input type='password' name='password' id='password' value={password}placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}></input>
          </div>
          <p className='loginPara'>
            By Signingup you agree to terms and privacy 
          </p>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={()=>{postData()}}></input>
            </div>
            <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
         
        </div>
    </div>
  )
}

export default SignUp