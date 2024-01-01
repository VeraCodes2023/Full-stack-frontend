import { createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from "../asyncThunk/categorysAsync";
import  Category  from '../../types/category';

const initialState:{
    loading: boolean;
    error?: string;
    categories: Category[]
}={
    categories:[],
    loading: false,
    error:undefined
}

const categorySlice = createSlice({ 
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.pending,(state,action)=>{
            if(action.type === fetchCategories.pending.type){
                return{
                    ...state,
                    loading:true
                }
            }
        })
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            if( !(action.payload instanceof Error) ){
                return {
                    ...state,
                    categories: action.payload,
                    loading:false,
                    error: undefined,
                }
            }
        })
        builder.addCase(fetchCategories.rejected,(state,action)=>{
            if(action.payload instanceof Error){
                return{
                    ...state,
                    loading:false,
                    error:action.payload.message
                }
            }
        })
    }
}) 


const categoryReducer = categorySlice.reducer
export default categoryReducer