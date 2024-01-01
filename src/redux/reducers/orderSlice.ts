import { createSlice} from '@reduxjs/toolkit';
import Order from '../../types/ReadOrder';
import {createOrderAsync} from "../asyncThunk/orderAsync";

const initialOrder: Order = {
    purchaseId: "",
    userId: "",
    user: {
        id: "",
        name: "",
        email: "",
        role: "",
        avatar: "",
        addresses: []
    },
    status: "",
    purchaseItems: [],
    createdAt: ""
};

const initialState:{
    loading: boolean;
    error?: string;
    newOrder: Order,
    purchases: Order[]
}={
    purchases:[],
    newOrder:initialOrder,
    loading: false,
    error:undefined
}



const orderSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{

        builder.addCase(createOrderAsync.fulfilled, (state,action)=>{
            if(action.payload && (!(action.payload instanceof Error)) )
            {
                state.newOrder = action.payload;
                state.purchases.push(action.payload)
            }
        })

        builder.addCase(createOrderAsync.rejected, (state,action)=>{
            return {
                ...state,
                loading:false,
                error:action.payload as string
            }
        })
    }
})

const orderReducer = orderSlice.reducer
export default orderReducer