import {PayloadAction , createSlice} from '@reduxjs/toolkit';
import UserListProps from '../../types/UserList';

import  {
    fetchUsersAsync, 
    registerUser,
    authenticateUserAsync,
    updateUser,
    loginUserAsync
 } from '../asyncThunk/userAsync';


const initialState:{
    error:string | undefined,
    loading:boolean,
    loginUser:UserListProps|null,
    users:UserListProps[]
}={
    error:"",
    loading:false,
    loginUser:null,
    users:[]
}

const usersSlice= createSlice({
    name:'users',
    initialState,
    reducers:{
        logOut: (state, action) => {
            state.loginUser=null;
            localStorage.clear()
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsersAsync.fulfilled, (state,action)=>{
            state.users =action.payload
        })
        builder.addCase(registerUser.fulfilled,(state,action:PayloadAction<UserListProps>)=>{
            state.users.push(action.payload)
            if(! (action.payload instanceof Error)){
                const userExists=state.users.map(user=>user.id=== action.payload.id)
                if(!userExists){
                    state.users.push(action.payload)
                }
            }
        })
        builder.addCase(registerUser.rejected, (state,action)=>{
            // console.log(action.payload)
            if(action.payload instanceof Error){

                return{
                    ...state,
                    loading:false,
                    error:action.payload.message
                }
            }
        })
        builder.addCase(registerUser.pending, (state, action)=>{
             return{
                ...state,
                loading:true
            }
        })
        builder.addCase(authenticateUserAsync.fulfilled,(state,action)=>{
            state.loginUser=action.payload
            state.error=""
        })
        builder.addCase(authenticateUserAsync.rejected,(state,action)=>{
            state.error=action.payload as string | undefined
        })
        .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.loginUser = action.payload
                state.error=""
        })
        .addCase(loginUserAsync.rejected, (state, action) => {
            console.log("userreducer rejected")
            state.error=action.payload as string | undefined
            
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.loginUser=action.payload
            state.error=""
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.error=action.payload as string | undefined
        })
    }
})


const userReducer = usersSlice.reducer
export const {logOut } = usersSlice.actions
export default userReducer