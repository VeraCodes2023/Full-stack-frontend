import React,{ useState,useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/asyncThunk/userAsync';
import axios from 'axios';
import { useAppDisPatch }from '../redux/hooks/useAppDispatch';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import UserInputProps from '../types/UserInput';

const RegisterUser:React.FC = () => {
    const redirect = useNavigate()
    const [isFormValid, setIsFormValid] = useState(false);
    const dispatch = useAppDisPatch()
    const [file, setFile] = useState<File | null>(null);
    const [img,setImg]=useState("")
    const [message,setMessage]=useState("")
    const [warn,setWarn]=useState("")


    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        avatar:"",
        addresses:[{
          street:"",
          city:"",
          state:"",
          postalCode:"",
          country:""
        }]
    })

    const validateForm = () => {
      const isValid = user.name.length > 0 && user.password.length > 4;
      setIsFormValid(isValid);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
    };
    const handleUpload = useCallback(async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
              const response = await axios.post(
                'https://api.escuelajs.co/api/v1/files/upload',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  }
                }
              );
              setImg(response.data.location)
            } catch (error) {
              console.error('Error:', error)
            }
        }
      }, [file]);

      useEffect(
        ()=>{
        handleUpload()
      },[handleUpload]
    )
    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value} = event.target;
        setUser({...user, [name]:value} )
        validateForm()
    }

    const handleAddressChange = (event:React.ChangeEvent<HTMLInputElement>,index: number) => {
      const {tabIndex, name, value} = event.target;
      setUser(prevUser => {
        const updatedAddressDTOs = [...prevUser.addresses];
        updatedAddressDTOs[tabIndex] = {
          ...updatedAddressDTOs[tabIndex],
          [name]: value
        };
        return { ...prevUser, addresses: updatedAddressDTOs };
      });
    };

    const handleSubmit= async (e:React.FormEvent)=>{
      e.preventDefault()
      if(isFormValid){
          
            const newUser: UserInputProps ={
            name:user.name,
            email:user.email,
            password:user.password,
            avatar:img,
            addresses: [{
              street: user.addresses[0].street,
              city: user.addresses[0].city,
              state: user.addresses[0].state,
              postalCode: user.addresses[0].postalCode,
              country: user.addresses[0].country,
            }]
          }
          if(newUser)
          await  dispatch(registerUser(newUser))
          .then(()=>{
                setUser({
                  name:"",
                  email:"",
                  password:"",
                  avatar:"",
                  addresses:[{
                    street:"",
                    city:"",
                    state:"",
                    postalCode:"",
                    country:""
                  }]
                })
                setMessage("Registered Account successfully, please login...")
                setTimeout(()=>{ 
                  setMessage("")
                  redirect('/login',{replace:true})},4000
                )
              
          })  
      }else{
        setWarn("input validation failed")
        setTimeout(()=>{ 
          setWarn("")},4000
        )
      }
    }

  return (
    <form id='createUser' onSubmit={e=>handleSubmit(e)}>
        <Stack sx={{ width: '100%', marginBottom:1 }} spacing={2}>
          {message?<Alert severity="success">{message}</Alert>:null}
          {warn?<Alert severity="error">{warn}</Alert>:null}
        </Stack>
        <div className='basicinfo'>
          <div>
              <input type="text"  name='name'    placeholder='Name' value={user.name} onChange={handleInputChange} />
          </div>
          <div>
              <input type="email"  name='email'    placeholder='Email' value={user.email} onChange={handleInputChange} />
          </div>
          <div>
              <input type="password"  name='password'    placeholder='Password' value={user.password} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="input">Upload Profile Photo</label>
            <input type="file"  name="avatar" multiple  onChange={handleFileChange}  placeholder='avatar'/>
          </div>
        </div>
        <div className='address'>
        {
          user.addresses.map((address,index) => (
          <div key={index}>
            <input
              type="text"
              name='street'
              placeholder="Street"
              value={address.street}
              onChange={(e) => handleAddressChange(e, index)}
            />
            <input
              type="text"
              name='city'
              placeholder="City"
              value={address.city}
              onChange={(e) => handleAddressChange( e,index)}
            />
            <input
              type="text"
              name='state'
              placeholder="State"
              value={address.state}
              onChange={(e) => handleAddressChange( e,index)}
            />

            <input
              type="text"
              name='postalCode'
              placeholder="PostalCode"
              value={address.postalCode}
              onChange={(e) => handleAddressChange( e,index)}
            />

              <input
              type="text"
              name='country'
              placeholder="Country"
              value={address.country}
              onChange={(e) => handleAddressChange( e,index)}
            />
          </div>
        ))
      }
        </div>
        <button>Register Account</button>
    </form>
  )
}

export default RegisterUser;