import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ProductProps from '../../types/product';
import {
    fetchAllProducts,
    fetchSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
} from '../asyncThunk/productsAsync';

const initialState:{
    products:ProductProps[],
    categoryProducts:ProductProps[],
    categoryNameList:string[],
    filteredProducts:ProductProps[],
    singleProduct:ProductProps | undefined,
    error?: string
    loading: boolean
}={
    products: [],
    categoryProducts:[],
    filteredProducts:[],
    categoryNameList:[],
    singleProduct:undefined,
    loading: false
}

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setUpState: (state, action) => {
            state.products = action.payload;
        },
        sortProductsbyPrice:(state, action:PayloadAction<'asc'| 'desc'>)=>{
            if(action.payload === 'asc'){
                state.products.sort(
                    (a,b)=>{return a.price - b.price}
                )
            }if(action.payload === 'desc'){
                state.products.sort(
                    (a,b)=>{return b.price-a.price}
                )
            }
        },
        getCategoryProducts:(state, action:PayloadAction<number>)=>{
           state.categoryProducts=state.products.filter(product=>product.categoryId === action.payload)
        },
        getcategoryNames:(state, action:PayloadAction)=>{
           state.categoryNameList = state.categoryProducts.map(product=>product.title)
        },
        getSingleProduct:(state, action:PayloadAction<string>)=>{
            const foundProduct = state.products.find(product=>product.id === action.payload)
            console.log(foundProduct)
            if(foundProduct){
                console.log(foundProduct)
                state.singleProduct = foundProduct
            }
         },
        getFilteredProducts:(state, action:PayloadAction<string>)=>{
            state.filteredProducts=state.products.filter(product=>product.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
        resetProductsState: (state) => {
            state.products = [];
            state.categoryProducts = [];
            state.filteredProducts = [];
            state.singleProduct = {
              id: "",
              title: "",
              price: 0,
              inventory:0,
              description: "",
              images:[{ url:"" }],
              creationAt: "",
              updatedAt: "",
              categoryId:1
            };
            state.error = "";
            state.loading = false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending, (state,action)=>{
            return {
                ...state,
                loading: true
            }
        })
        builder.addCase(fetchAllProducts.fulfilled, (state,action)=>{
            if( !(action.payload instanceof Error) ){
                return {
                    ...state,
                    loading:false,
                    products:action.payload
                  
                }
            }
        })
        builder.addCase(fetchAllProducts.rejected, (state,action)=>{
            if(action.payload instanceof Error){
                return{
                    ...state,
                    loading:false,
                    error:action.payload.message
                }
            }
        })
        
        builder.addCase(addProduct.fulfilled, (state,action)=>{
            if(action.payload && (!(action.payload instanceof Error)) )
            state.products.push(action.payload)
        })
        builder.addCase(addProduct.rejected, (state,action)=>{
            return {
                ...state,
                loading:false,
                error:action.payload as string
            }
        })
        builder.addCase(updateProduct.fulfilled, (state,action)=>{
            state.products= state.products.map(product=>product.id === action.payload.id? {...action.payload}:product)
        })
        builder.addCase(updateProduct.rejected,(state,action)=>{
            return {
                ...state,
                loading:false,
                error:action.payload as string
            }
        })
        builder.addCase(deleteProduct.fulfilled,(state,action: PayloadAction<string>)=>{
             state.products= state.products.filter(product => product.id !== action.payload)
        })
        builder.addCase(deleteProduct.rejected, (state,action)=>{
            console.log(action.payload)
            return {
                ...state,
                loading:false,
                error:action.payload as string
            }
        })

        // builder.addCase(fetchSingleProduct.fulfilled,(state,action:PayloadAction<ProductProps>)=>{
        //     state.singleProduct = action.payload;
        //     state.loading = false;
        //     state.error = undefined;
        // })
        // builder.addCase(fetchSingleProduct.rejected,(state,action:PayloadAction<any>)=>{
        //     state.error = action.payload; 
        //     state.singleProduct = undefined; 
        //     state.loading = false;
        // })
     
    }
})

const productReducer = productsSlice.reducer

export const {
    setUpState,
    sortProductsbyPrice, 
    getCategoryProducts, 
    getcategoryNames,
    getSingleProduct,
    getFilteredProducts,
    resetProductsState
} = productsSlice.actions

export default productReducer