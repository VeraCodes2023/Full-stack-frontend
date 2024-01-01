import React from 'react';
import CartItem from '../types/CartItems';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import { 
  removeFromCart, 
  toggleCartItem, 
  handleIncrement,
  handleDecrement,
  clearCart
} from '../redux/reducers/cartSlice';

import {createOrderAsync} from "../redux/asyncThunk/orderAsync";
import CreateOrder from '../types/CreateOrder';


const CartPage:React.FC = () => {

  const disptach = useAppDisPatch()
  const shopCartItems = useAppSelector (state =>state.cartReducer)
  const redirect = useNavigate()

  const handleToggleCheckbox=(itemId:string)=>{
    disptach(toggleCartItem(itemId))
  };

  const deleteItem =(id:string)=>{
    disptach(removeFromCart(id))   
  }

  const handleIncrementQuantity = (itemId:string) => {
    disptach(handleIncrement(itemId))
  };

  const handleDecrementQuantity = (itemId:string) => {
    disptach(handleDecrement(itemId))
  };

  const calculateSubtotal = (item:CartItem) => {
    return Number (item.price) * Number(item.quantity);
  };

  const calculateTotalPrice = () => {
    const totalPrice = shopCartItems.reduce((total, item) => {
      if (item.isChecked) {
        return total + calculateSubtotal(item);
      }
      return total;
    }, 0);

    return totalPrice;
  };


const createOrder= async ()=>{

  const newOrderItems = shopCartItems.map(item => {
    return {
      productId: item.id, 
      quantity: item.quantity 
    };
  });

  const newOrder: CreateOrder = {
    purchaseItems: newOrderItems
  };

   await disptach(createOrderAsync(newOrder))
   disptach(clearCart())
   redirect('/order', { replace: true, state: { cartItems: shopCartItems } });
}


  return (
        <table id="cart">
          <thead className='tableheader'>
              <tr>
                <th>Select</th>
                <th>Item</th>
                <th></th>
                <th>Price</th>
                <th>Qantity</th>
                <th>Sub Total</th>
              </tr>
          </thead>
          <tbody>
          {shopCartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={()=>handleToggleCheckbox(item.id) }
                />
              </td>
                {
                  item.images && item.images.length > 0 &&
                  <td>
                      <img src={item.images[0].url} alt="pic"/>
                  </td>
                }
          
              <td>
                 {item.title}
              </td>
              <td>{item.price} Euros</td>
              <td>
                <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
              </td>
               {shopCartItems? <td>€{calculateSubtotal(item)}</td> :<td></td>}
              <td>
                 <button onClick={()=>deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
            <tr>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              {
                shopCartItems.length <1? (<th></th>):(<th style={{textAlign:'left'}}>Grand total: €{calculateTotalPrice()}</th>)
                
              }
    
            </tr>
            <tr>
              {
                shopCartItems.length <1?(<th></th>) : 
                <th>
                  <button onClick={()=>createOrder()}>Generate Order</button>
                </th>
              }
              
            </tr>
          </tfoot>
        </table>
  )
}

export default CartPage

