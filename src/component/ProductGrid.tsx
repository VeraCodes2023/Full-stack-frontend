import React from 'react';
import {Link} from 'react-router-dom';
import {Grid} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import  ProductProps from '../types/product';
import {useAppDisPatch} from '../redux/hooks/useAppDispatch';
import { addToCart } from "../redux/reducers/cartSlice";


interface GridProps{
    p:ProductProps,
    value:string,
}
const ProductGrid:React.FC<GridProps> = ({p,value}) => {
    const dispatch = useAppDisPatch();
    const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>, payload:ProductProps)=> {
        event.preventDefault();
        dispatch(addToCart(payload))
    
      }
 

  return (
    <Grid  item xs={3} id="item">
        <TabPanel value={value } key={p.id}>
            <Link to={`/details/${p.id}`}>
                {
                    p.images && p.images.length > 0 &&<img src={p.images[0].url } className='bgPic' alt='pic'></img>
                }
                <div className="title">
                    <h5>{p.title}</h5>
                    <p className='price'>{p.price} Euro</p>
                </div>
            </Link>
            <button id='cartBtn' onClick={(event)=>onAddToCart(event,p)} >Add to Cart</button>
        </TabPanel>
    </Grid> 
  )
}

export default ProductGrid;
