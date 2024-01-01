import React,{ useState,useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/asyncThunk/userAsync';
import axios from 'axios';
import  {useAppSelector} from '../redux/hooks/useAppSelector';
import { useAppDisPatch }from '../redux/hooks/useAppDispatch';

const ProfileUpdate:React.FC = () => {
    const {error}=useAppSelector(state=>state.usersReducer)
    const redirect = useNavigate()
    const dispatch = useAppDisPatch()
    const [file, setFile] = useState<File | null>(null);
    const [img,setImg]=useState("")
    const [message,setMessage]=useState("")
   
    const [user,setUser]=useState(
      {
        name:"",
        avatar:img,
        addresses:[{
          street:"",
          city:"",
          state:"",
          postalCode:"",
          country:""
        }]
      })
    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value} = event.target;
        setUser({...user, [name]:value} )
    }
    
    useEffect(()=>{
        // var storedAddress=localStorage.getItem('addresses')
        // const parsedAddresses = storedAddress ? JSON.parse(storedAddress) : [];
        setUser({
            name:localStorage.getItem('name')??'',
            avatar:localStorage.getItem('avatar')??'',
            addresses: JSON.parse(localStorage.getItem('addresses') || '[]') as {
              street: string;
              city: string;
              state: string;
              postalCode: string;
              country: string;
          }[]
        })
    },[])

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

      const storedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]') as {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      }[];
      const updatedAddress = storedAddresses.length > 0 ? {
        street: storedAddresses[0].street,
        city: storedAddresses[0].city,
        state: storedAddresses[0].state,
        postalCode: storedAddresses[0].postalCode,
        country: storedAddresses[0].country,
    } : {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    };

  
    // const updatedAddress = {
    //   street: user.addresses[0]!.street,
    //   city: user.addresses[0]!.city,
    //   state: user.addresses[0]!.state,
    //   postalCode: user.addresses[0]!.postalCode,
    //   country: user.addresses[0]!.country,
    // };
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

    const handleUpdateProfile= async (e:React.FormEvent)=>{
        e.preventDefault()
   
        const updateProfile = {
          name: user.name,
          avatar: img,
          addresses: [updatedAddress] as [{ street: string; city: string; state: string; postalCode: string; country: string }],
        };
   
       await dispatch(updateUser(updateProfile))
       setMessage("profile has been updated successfully... wait page redirect")
       setUser({
        name:"",
        avatar:"",
        addresses:[]
       })
       setTimeout(()=>{redirect('/profile')},2000)
      
    }

  return (
    <form id='createUser' onSubmit={e=>handleUpdateProfile(e)}>
        <h1>update user profile form</h1>
        {message? <p className='reminder'>{message}</p>:null}
        {error? <p className='error'>{error}</p>:null}
        <div>
            <input type="text"  name='name'    placeholder='Name' value={user.name} onChange={handleInputChange} />
        </div>
       
        <div>
            <label htmlFor="input">Upload Profile Photo</label>
            <input type="file"  name="avatar" multiple  onChange={handleFileChange}  placeholder='avatar'/>
        </div>
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
        <button>Update Profile</button>
    </form>
  )
}

export default ProfileUpdate