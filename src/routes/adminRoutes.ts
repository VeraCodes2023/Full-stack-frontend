import AdminDashBoard from '../pages/AdminDashBoard';
import CreateProduct from '../component/CreateProduct';
import UpdateProduct  from '../component/UpdateProduct';

const adminRoutes =[
    {
        path:"/admin",
        component:AdminDashBoard
    },
    {
        path:"/createProduct",
        component:CreateProduct
    },
    {
        path:"/updateProduct",
        component:UpdateProduct
    }
  
   
]

export default adminRoutes