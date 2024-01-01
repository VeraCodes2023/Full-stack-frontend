import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import  {useAppDisPatch} from '../redux/hooks/useAppDispatch';
import  {useAppSelector} from '../redux/hooks/useAppSelector';
import  {loginUserAsync} from '../redux/asyncThunk/userAsync';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const UserLogin:React.FC = () => {
    const {error,loginUser}=useAppSelector(state=>state.usersReducer)
    const dispatch = useAppDisPatch()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const navigate = useNavigate()

    useEffect(()=>{

        if(loginUser){
            if(loginUser.role ==="Customer"){
                setEmail("");
                setPassword("");
                setMessage("Login successfully, wait a second to redirect...");
                setTimeout(() => {
                  navigate('/profile', {replace:true});
                }, 2000);
            }else if(loginUser.role ==="Admin"){
                setEmail("")
                setPassword("")
                setMessage("login successfully, wait a second to redirect...")
                setTimeout(()=>{navigate('/admin',{replace:true})},2000)
            }
        }else{
            return
        }
    },[loginUser, navigate])

   
    const loginHandler = async (e:React.FormEvent)=>{
        e.preventDefault()
        try{
            await dispatch(loginUserAsync({
                email:email,
                password:password,
                }))  
         }catch(err:any){  

             console.log(err)
        }
   }


  return (
    <div id="formWrapper">
        <div>
            <h2>User Login</h2>
        </div>
        <form  id='userLoginForm'  onSubmit={e=>loginHandler(e)}>
            <Stack sx={{ width: '110%', marginBottom:1 }} spacing={2}>
                {message?<Alert severity="success">{message}</Alert>:null}
                {loginUser !==undefined && loginUser !==null && error?<Alert severity="error">{error}</Alert>:null}
            </Stack>
            <div>
                <input type="email"  value={email}  onChange={e=>{
                    setEmail(e.target.value)
                    }}placeholder='Email'/>
            </div>
            <div>
                <input type="password" value={password}  onChange={e=>{
                    setPassword(e.target.value)
                    }}  placeholder='Password'/>
            </div>
            <button>Login</button>
            <div>
                <p>Don't have an account yet ? 
                    <Link to='/register'>Register</Link>
                </p>
            </div>
        </form>
    </div>
  )
}

export default UserLogin

