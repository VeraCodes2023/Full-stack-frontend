import {createAsyncThunk } from "@reduxjs/toolkit";
import ProductProps from "../../types/product";
import ProductInput from "../../types/ProductInput";
import Update from '../../types/Update';
import PaginationQuery from "../../types/PaginationQery";
import axios from "axios";
// import Category from "../../types/category";
const apiUrl = "https://shopify-2023.azurewebsites.net/api/v1/products/";

//
export const fetchAllProducts = createAsyncThunk(
    'fetchAllProductsAsync',
    async ({  offset, limit }: PaginationQuery) => {
        try {
           const response = await axios.get(`https://shopify-2023.azurewebsites.net/api/v1/products?offset=${offset}&limit=${limit}`)
        //    console.log(response.data.data)
           return response.data.data as ProductProps[]
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)
// http://localhost:5074/api/v1/products
// https://api.escuelajs.co/api/v1/products?
//https://api.escuelajs.co/api/v1/categories
//http://localhost:5074/api/v1/categories






export const fetchSingleProduct = createAsyncThunk(
    "fetchSingleProduct",
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`https://shopify-2023.azurewebsites.net/api/v1/products/${id}`);
        console.log(response.data.data)
        return response.data.data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
);

//   const response = await axios.get(url,{headers})
export const addProduct = createAsyncThunk(
    'addProduct',
    async(newProduct: ProductInput) => {
    
        try {
            const access_token = localStorage.getItem("access_token");
            console.log(access_token)
            const headers ={
                Authorization: `Bearer ${access_token}`,
            }
            const response = await axios.post(apiUrl, newProduct,{headers});
            console.log(response.data.data)
            return response.data.data as ProductProps
            
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async(id:string)=>{
        try{
            const access_token = localStorage.getItem("access_token");
            const headers ={
                Authorization: `Bearer ${access_token}`,
            }
           const response = await axios.delete(`${apiUrl}${id}`,{headers})
           return response.data.data
        }catch(err){
            return err
        }
    }
)



export const updateProduct = createAsyncThunk(
    'updateProduct',
    async(update:Update,{rejectWithValue}  )=>{
        try {
            const access_token = localStorage.getItem("access_token");
            const headers ={
                Authorization: `Bearer ${access_token}`,
            }
            const response = await axios.put(`${apiUrl}${update.id}`, update.updateProductProps,{headers})
            console.log(response.data.data)
            return response.data.data
            
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

