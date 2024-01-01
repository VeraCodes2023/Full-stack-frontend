import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faTruck} from '@fortawesome/free-solid-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import  { useAppSelector } from '../redux/hooks/useAppSelector';


const UserProfilePage:React.FC =()=>{
  const redirect = useNavigate()
  const {loginUser} = useAppSelector(state=>state.usersReducer)

  const handleUpdateUser=()=>{
      if(loginUser){
        localStorage.setItem('id',loginUser.id.toString())
        localStorage.setItem('name',loginUser.name)
        localStorage.setItem('email',loginUser.email)
        localStorage.setItem('password', loginUser.password)
        localStorage.setItem('avatar', loginUser.avatar)
      }
   
      redirect('/profileUpdate',{replace:true})
  }

  console.log(loginUser)

  return(<div id="profile">
      <div>
          <img src={loginUser?.avatar} alt="pic" />
          <h2> {loginUser && loginUser.name} </h2>
          <div>
            <a href="##">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <p>{loginUser && loginUser.email}</p>
          </div>
          <div>
            <a href="##">
              <FontAwesomeIcon icon={faPhone} />
            </a>
            <p>044 985 7318</p>
          </div>
          <div>
            <a href="##">
              <FontAwesomeIcon icon={faTruck} />
            </a>
            {loginUser && Array.isArray(loginUser.addresses) && loginUser.addresses.length >= 1 ? (
            <p>
              {loginUser.addresses[0]!.street}
              {loginUser.addresses[0]!.city}
              {loginUser.addresses[0]!.state}
              {loginUser.addresses[0]!.postalCode}
              {loginUser.addresses[0]!.country}
            </p>
          ) : ""}
          </div>
          <button onClick={()=>handleUpdateUser()}>Update</button>
      </div>
     
  </div>)
}


export default UserProfilePage