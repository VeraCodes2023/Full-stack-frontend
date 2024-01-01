import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Category from "../../types/category";

// http://localhost:5074/api/v1/products
//https://shopify-2023.azurewebsites.net/api/v1/categories
const BASE_URL="https://shopify-2023.azurewebsites.net/api/v1/categories";

export const fetchCategories = createAsyncThunk(
    'fetchCategoryAsync',
    async () => {
        try {
           const response = await axios.get(BASE_URL)
        //    console.log(response.data.data)
           return response.data.data as Category[]
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)