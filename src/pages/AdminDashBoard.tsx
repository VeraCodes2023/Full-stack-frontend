import React,{useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import { deleteProduct } from '../redux/asyncThunk/productsAsync';
import { fetchAllProducts } from '../redux/asyncThunk/productsAsync';
import ProductProps from '../types/product';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';

interface Column {
  id: 'title' | 'price' | 'description' |'inventory'|'img'| 'update'| 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
}
const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 60 },
  { id: 'price', label: 'Price', minWidth: 60},
  { id: 'description', label: 'Description',minWidth: 170},
  { id: 'inventory',label: 'Inventory',minWidth: 100},
  { id: 'img',label: 'Image',minWidth: 100},
  { id: 'update',label: 'Update',minWidth: 100},
  { id: 'delete',label: 'Delete',minWidth: 100},
];

const AdminDashBoard:React.FC =()=>{
  // const access_token = localStorage.getItem("access_token");
  const redirect = useNavigate()
  const {products,loading, error} = useAppSelector(state=>state.productReducer)
  const dispatch = useAppDisPatch()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [message,setMessage]=useState("")

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    dispatch(fetchAllProducts({offset:0, limit:200}))
  },[dispatch,products])

  // console.log(products)

  const  handleUpdate=(product:ProductProps)=>{
      localStorage.setItem('id', product.id.toString())
      localStorage.setItem('title',product.title)
      localStorage.setItem('price', product.price.toString())
      localStorage.setItem('imageReadDTOs',product.images[0].toString())
      localStorage.setItem('description',product.description)
      localStorage.setItem('categoryId',product.categoryId.toString())
      redirect('/updateProduct', {replace:true})
  }

  const handleDelete= async (id:string)=>{
    try{
      await dispatch(deleteProduct(id))
      setMessage("product has been deleted ...")
      setTimeout(()=>{setMessage("")},2000)
      
    }catch(err){
        setMessage("product deletion failed...")
        setTimeout(()=>{setMessage("")},2000)
        
    }
   
 }



  return(
  <div id='admin'>
   <Button onClick={()=>redirect('/createProduct', {replace:true})}>Add New Product</Button>
   <Paper sx={{ width: '70%', overflow: 'hidden', margin:"auto",
    marginTop:1, marginBottom:9}}>
     <Stack sx={{ width: '100%', marginBottom:1 }} spacing={2}>
          {message?<Alert severity="success">{message}</Alert>:null}
          {error?<Alert severity="error">{error}</Alert>:null}
          {loading? <LoadingButton/>:null}
     </Stack>
    <TableContainer sx={{ maxHeight: 580 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead  >
          <TableRow>
       
            {columns.map((column) => (
              <TableCell
                sx={{fontWeight:"bold"}}
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
    
        {products && products.map(
          (row)=>(
            <TableRow key={row.id} >
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.inventory}</TableCell>
                <TableCell>
                  <img src={row.images[0].url}  alt='pic' style={{width:50, height:50}}    />
                </TableCell>
                <TableCell>
                  <Button
                    className='btn'
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={()=>{handleUpdate(row)}}
                  >
                    Update
                  </Button>
              </TableCell>
              <TableCell>
                  <Button
                    className='btn'
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={()=>{handleDelete(row.id)}}
                  >
                    delete
                  </Button>
              </TableCell>
            </TableRow>
          )
         )
        }
      </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={products.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    {message? <p className='reminder'>{message}</p>:null}
    </Paper>
  </div>
  )
}

export default AdminDashBoard