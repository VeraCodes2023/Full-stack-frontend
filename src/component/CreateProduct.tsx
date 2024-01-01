import React,{ useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import { addProduct } from '../redux/asyncThunk/productsAsync';
import ProductInput from '../types/ProductInput';
import { useNavigate } from 'react-router-dom';
import  {useAppSelector} from '../redux/hooks/useAppSelector';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const CreateProduct:React.FC = () => {
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
        inventory:0,
        categoryId:0,
        images:[{url:""}]
    })
    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
      const { name, value} = event.target;
      setProduct({...product, [name]:value} )
   }

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
                }
              }
            );
            setImg(response.data.location)
          } catch (error) {
            console.error('Error:', error)
          }
      }
    }, [file]);

    useEffect(
        ()=>{
        handleUpload()
      },[handleUpload]
    )

    const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const newProduct:ProductInput={
            title:product.title,
            price:product.price,
            description:product.description,
            inventory:product.inventory,
            images:[{ url: img.toString() }],
            categoryId:product.categoryId
        }
        console.log(newProduct)
        await  dispatch(addProduct(newProduct))
        setMessage("Product has been added successfully... wait for page redirect")
        setProduct({
            title:"",
            price:0,
            description:"",
            inventory:0,
            categoryId:1,
            images:[{ url:"" }],
        })
       redirect('/admin', {replace:true})  
    }

  return (
    <form id='newProductForm'  onSubmit={e=>handleSubmit(e)}>
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
            <input type="number"  name='inventory'  placeholder='Inventory' value={product.inventory} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Category ID</label>
            <input type="number" name='categoryId' placeholder='Category ID' value={product.categoryId} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Images</label>
            <input type="file" name="imgInput" multiple  onChange={handleFileChange}/>
        </div>
        <button>Create Product</button>
    </form>
)
}

export default CreateProduct