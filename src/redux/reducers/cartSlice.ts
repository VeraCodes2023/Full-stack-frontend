import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from '../../types/CartItems';
import ProductProps from "../../types/product";

const initialState:CartItem[]=[]

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<ProductProps>)=>{
            const cartItem : CartItem= {...action.payload, quantity:1, isChecked:false}
            const foundIndex =state.findIndex(item => item.id === action.payload.id)
            if(foundIndex !== -1){
                state[foundIndex].quantity++
            }else{
                state.push(cartItem)
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const idToRemove = action.payload
            return state.filter((item) => item.id !== idToRemove);
        },
        toggleCartItem: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const item = state.find(item => item.id === itemId);
            if (item) {
                item.isChecked = !item.isChecked;
            }
        },
        handleIncrement:(state, action:PayloadAction<string>)=>{
            return state.map(item =>item.id === action.payload ? {...item,quantity:item.quantity+1}:item)
        },
        handleDecrement:(state, action:PayloadAction<string>)=>{
            return state.map(item=>item.id === action.payload && item.quantity >1? {...item, quantity:item.quantity-1}:item)
        },
        clearCart:(state)=>{
            localStorage.removeItem('cart');
            return [];
        }
    }
    
})


const cartReducer = cartSlice.reducer
export const {  addToCart,removeFromCart,toggleCartItem, handleIncrement, handleDecrement,clearCart } = cartSlice.actions
export default cartReducer