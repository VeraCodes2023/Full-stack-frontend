import React,{ useState,useEffect,useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import  { updateProduct }from '../redux/asyncThunk/productsAsync';
import  {useAppSelector} from '../redux/hooks/useAppSelector';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ImageReadDTOs from '../types/ImagerReadDTO';
import Update from '../types/Update';
import UpdateProductProps from '../types/updatedProduct';
const UpdateProduct:React.FC = () => {

    const {error}=useAppSelector(state=>state.productReducer)
    const [message,setMessage]=useState("")
    const [file, setFile] = useState<File | null>(null);
    const [img,setImg]=useState([""])
    const dispatch =useAppDisPatch()
    const redirect= useNavigate()

    const [product,setProduct]=useState({
        title:"",
        price:0,
        description:"",
        inventory:0
    })
      
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
    };

    const handleUpload = useCallback(async () => {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(
            'https://api.escuelajs.co/api/v1/files/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          setImg(response.data.location);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }, [file]);

    useEffect(()=>{
        handleUpload()
    },[handleUpload])
 
    useEffect(()=>{
        const priceFromLocalStorage = localStorage.getItem('price') ?? '';
        const imageReadDTOsFromLocalStorage = localStorage.getItem('imageReadDTOs');
        if (imageReadDTOsFromLocalStorage) {
          //  const parsedImageReadDTOs = JSON.parse(imageReadDTOsFromLocalStorage);
           setProduct({
            title:localStorage.getItem('title')?? '',
            price:parseFloat (priceFromLocalStorage),
            description:localStorage.getItem('description')??'',
            inventory:Number(localStorage.getItem('inventory')),
          })
        }
      
        
    },[])

    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value} = event.target;
        setProduct({...product, [name]:value} )
    }

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        let id = localStorage.getItem('id')!;
        const updatedProduct: UpdateProductProps={
            title:product.title!,
            price:Number(product.price)!,
            description:product.description!,
            inventory:product.inventory!
        }

        const update: Update = {
          id:id,
          updateProductProps:updatedProduct
        }
        await dispatch(updateProduct(update))
        setMessage("Product info has been updated successfully... wait for page redirect")
        setTimeout(()=>{ redirect('/admin', {replace:true}) },2000)   
    }

  return (
    <form id='updateProductForm' onSubmit={e=>{handleSubmit(e)}}>
        <Stack sx={{ width: '100%', marginBottom:1 }} spacing={2}>
          {message?<Alert severity="success">{message}</Alert>:null}
          {error?<Alert severity="error">{error}</Alert>:null}
        </Stack>
        <div>
            <label htmlFor="">Product Title</label>
            <input type="text" name='title' value={product.title}   placeholder='Product Title'  onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Price</label>
            <input type="number" name='price' placeholder='Price' value={product.price} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Description</label>
            <input type="text"  name='description'  placeholder='Description' value={product.description} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Inventory</label>
            <input type="number" name='inventory' placeholder='Inventory' value={product.inventory} onChange={handleInputChange}/>
        </div>
        {/* <div>
            <label htmlFor="">Product Images</label>
            <input type="file" name="imgInput" multiple  onChange={handleFileChange}/>
        </div> */}

        <button>Update Product</button>
    </form>

  )
}

export default UpdateProduct