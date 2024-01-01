import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Order from "../../types/ReadOrder";
import CreateOrder from "../../types/CreateOrder";
const BASE_URL="https://shopify-2023.azurewebsites.net/api/v1/orders";


export const createOrderAsync= createAsyncThunk(
    'fetchCategoryAsync',
    async (order:CreateOrder) => {
        try {
            const access_token = localStorage.getItem("access_token");
            const headers ={
                Authorization: `Bearer ${access_token}`,
            }
           const response = await axios.post(BASE_URL,order,{headers} )
           console.log(response.data.data)
           return response.data.data as Order
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)