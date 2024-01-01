import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import UserListProps from '../../types/UserList';
import UserInputProps from '../../types/UserInput'
import User from '../../types/UserAuth';
import UpdateProfileProps from "../../types/UpdateProfile";

//https://shopify-2023.azurewebsites.net/api/v1/users
//http://localhost:5074/api/v1/users/login
export const fetchUsersAsync = createAsyncThunk<UserListProps[], void, { rejectValue: string }>(
  'fetchUsersAsync',
  async (_, { rejectWithValue }) => {
      try {
          const result = await axios.get('https://shopify-2023.azurewebsites.net/api/v1/users/login')
          return result.data
      } catch (e) {
          const error = e as Error
          return rejectWithValue(error.message)
      }
  }
)

//'http://localhost:5074/api/v1/users
//https://api.escuelajs.co/api/v1/users
export const registerUser = createAsyncThunk(
    'registerUser',
    async ( newUser:UserInputProps ) => {
        try {
           const response = await axios.post("https://shopify-2023.azurewebsites.net/api/v1/users", newUser)
           console.log(response.data.data)
           return response.data.data
        } catch (AxiosError:any) {
             let error = AxiosError.response.data.message[0]+ AxiosError.response.data.message[1]
             return error
        }
    }
)


export const updateUser = createAsyncThunk<UserListProps, UpdateProfileProps>(
  'updateUser',
  async (update, {rejectWithValue} ) => {
      try {
        const access_token = localStorage.getItem("access_token");
        const headers ={
            Authorization: `Bearer ${access_token}`,
        }
        console.log(access_token)
         const response = await axios.put<UserListProps>(`https://shopify-2023.azurewebsites.net/api/v1/users/profile`, update,{headers})
         return response.data
      } catch (e) {
        const error = e as Error
        return rejectWithValue(error.message)
      }
  }
)

//*********** */
export const userProfileAsync =createAsyncThunk(
  'userProfileAsync',
  async(access_token:string)=>{
    try{
      const url = "https://shopify-2023.azurewebsites.net/api/v1/users/profile";
      const headers ={
        Authorization: `Bearer ${access_token}`,
      }
      const response = await axios.get(url,{headers})
      console.log(response.data.data)
      return response.data
    }catch(err){
      throw err
    }
  }
)

export const authenticateUserAsync = createAsyncThunk<UserListProps, string, { rejectValue: string }>(
  "authenticateUserAsync",
  async (access_token, { rejectWithValue }) => {
      try {
          const getprofile = await axios.get('https://shopify-2023.azurewebsites.net/api/v1/users/profile', {
              headers: {
                  Authorization: `Bearer ${access_token}`
              }
          })
          return getprofile.data.data
      } catch (e) {
          const error = e as Error
          return rejectWithValue(error.message)
      }
  }
)

export const loginUserAsync = createAsyncThunk<UserListProps, User, { rejectValue: string }>(
  'loginUserAsync',
  async (cred, { rejectWithValue, dispatch }) => {
      try {
          const result = await axios.post('https://shopify-2023.azurewebsites.net/api/v1/users/login', cred)
          const access_token = result.data.data
          console.log(access_token)
          localStorage.setItem("access_token", access_token)
          const authenticatedResult = await dispatch(authenticateUserAsync(access_token))
          if (typeof authenticatedResult.payload === "string" || !authenticatedResult.payload) {
              throw Error(authenticatedResult.payload || "Cannot login")
          } else {
              return authenticatedResult.payload as UserListProps
          }
      }
      catch (e) {
          const error = e as Error
          return rejectWithValue(error.message)
      }
  }
)
