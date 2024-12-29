import React from 'react'
import {RiCloseLine} from "react-icons/ri";
import "../css/Modal.css";
import { useNavigate } from 'react-router-dom';
function Modal({setModalOpen}) {
    const navigate=useNavigate();
  return (
    <div className='darkBg' onClick={()=>setModalOpen(false)}>
        <div className='centered'>
       <div className='modal'>
        <div className='modalHeader'>
        <h5 className='heading'>Confirm</h5>
        </div>
        <button className='closeBtn'>
            <RiCloseLine></RiCloseLine>
        </button>
        <div className='modalContent'>
            Sure,You want to logout 
        </div>
        <div className='modalActions'>
            <div className='actionsContainer'>
                <button className='logOutBtn' onClick={()=>{
                    setModalOpen(false)
                    localStorage.clear()
                    navigate("./signin")
                }}>Log Out

                </button>
                <button className='cancelBtn' onClick={()=>setModalOpen(false)}>Cancel</button>
            </div>
        </div>
    </div>
    </div>
    
    </div>
    
  )
}

export default Modal