import React,{useState, useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/useAppSelector'; 
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import  { getSingleProduct,resetProductsState } from '../redux/reducers/productsSlice';
import  ProductProps from '../types/product';
import { addToCart } from  '../redux/reducers/cartSlice';
import {fetchSingleProduct,fetchAllProducts} from '../redux/asyncThunk/productsAsync';


const SingleProduct:React.FC = () => {
  const [prouduct,setProduct]=useState<ProductProps>();
  const redirect = useNavigate()
  const dispatch = useAppDisPatch()
  const {products } = useAppSelector(state=>state.productReducer)
  const {productId}=useParams()

  useEffect(()=>{
    dispatch(fetchAllProducts({offset:0, limit:220}))
  },[dispatch])

  var target= products.find(p=>p.id===productId?.toString())

   
  let pics = target!.images;
  const [selectedImage, setSelectedImage] = useState(pics[0]);

  const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>, payload:ProductProps)=> {
    event.preventDefault();
    if(target !== null){
      dispatch(addToCart(target!))
    }
  }
  const handleClick = (image: string) => {
     setSelectedImage({ url: image });
  };


  return (
    <div id='details'>

        <div className="left">
          <div className="top">
            {target!.images && target!.images.length > 0 && <img src={selectedImage.url} alt=""  style={{width:310, height:280}}/>}
          </div>
          <div className="bottom">
            {
              target!.images.map((image,index)=>(
              <img key={index} 
              alt=''
              style={{width:40, height:60}}
              onClick={() => handleClick(image.url)}
              src={image.url}/>))
            }
          </div>
        </div>
        <div className="right">
          <h2 className="title">{target?.title}</h2>
          <div className="price">{target?.price} Euros</div>
          <ul className="description">
              <p>Description:</p>
             <li>{target?.description}</li>
          </ul>
          <div>
            <button id='cartBtn' 
              onClick={(event)=>onAddToCart(event,target!)}
              >
              Add to Cart
            </button>  
            <button id='cartBtn' 
              onClick={()=>{
                redirect('/',{replace:true})
                dispatch(resetProductsState())
              }}
              >
              Back Home
            </button>
          </div>    
        </div>
        
    </div>
  )
}

export default SingleProduct
