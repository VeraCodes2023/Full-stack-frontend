import React,{useState, useEffect} from 'react';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import { useLocation } from 'react-router-dom';
import CartItem from '../types/CartItems';
import { useNavigate } from 'react-router-dom';


const OrderPage:React.FC = () => {
  const {newOrder} = useAppSelector(state=>state.orderReducer)
  const dispatch = useAppDisPatch()
  const redirect = useNavigate()

  const location = useLocation();
  const orderItems = location.state.cartItems;
  console.log(newOrder);

  const calculateTotalPrice = () => {
    if (newOrder && newOrder.purchaseItems && Array.isArray(newOrder.purchaseItems)) {
      const totalPrice = newOrder.purchaseItems.reduce((total, item) => {
        const itemTotal = item.productPrice * item.quantity;
        return total + itemTotal;
      }, 0);
      return totalPrice;
    } else {
      return 0; // or any default value indicating no items in purchaseItems
    }
  };

  return (
    <div id='order'>
      <div className='orderId'>
            <h3>PURCHASE ORDER</h3>
            <p>Purchase order No.{newOrder.purchaseId}</p>
            <p>Order Generate Time:{newOrder.createdAt}</p>
            <p></p>
      </div>

      <div className='createAt'>
    
         </div>
      <div className='delivery'>
         <div className='address'>
          <p>Delivery To:</p>
          <br />
          {newOrder && newOrder.user&& newOrder.user.addresses && newOrder.user.addresses[0] ? (
      <>
        {newOrder.user.addresses[0].street}
        {newOrder.user.addresses[0].city},
        {newOrder.user.addresses[0].postalCode},
        {newOrder.user.addresses[0].state},
        {newOrder.user.addresses[0].country}
      </>
    ) : (
      <p>No address found, please update your profile and add shipping address before placing orders.</p>
    )}

         </div>
        
      </div>

      <table className='ordertable'>
          <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Description</th>
                <th>Qantity</th>
                <th>Sub Total</th>
              </tr>
          </thead>
          <tbody>
            {
              orderItems&&orderItems.map((item:CartItem)=><tr key={item.id}>
                <td>{item.title}</td>
                <td>€{item.price}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>€{item.price*item.quantity}</td>
               </tr>
              )
              
            }
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Grand total: €{calculateTotalPrice()}</td>
            </tr>
          </tfoot>
      </table>
      <button className='orderBtn'  onClick={()=>redirect('/', {replace:true})}>Back Homepage</button>
    </div>
  )
}
export default OrderPage;