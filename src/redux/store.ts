import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productsSlice";
import usersReducer from "./reducers/usersSlice";
import cartReducer from "./reducers/cartSlice";
import CartItem from "../types/CartItems";
import categoryReducer from "./reducers/categorySlice";
import orderReducer from "./reducers/orderSlice";

let preCartReducer: CartItem[]=JSON.parse(localStorage.getItem('cart') || '[]')

if (!Array.isArray(preCartReducer)) {
    localStorage.setItem('cart', '[]');
    preCartReducer =[];
}

const store = configureStore({
    reducer: {
        productReducer,
        usersReducer,
        cartReducer,
        categoryReducer,
        orderReducer
    },
   preloadedState:{
        cartReducer :preCartReducer,
   }
})

const updateLocalStorage =()=>{
    const cart = store.getState().cartReducer
    localStorage.setItem('cart', JSON.stringify(cart))
}

store.subscribe(updateLocalStorage)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store