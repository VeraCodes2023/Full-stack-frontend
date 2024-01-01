import HomePage from '../pages/HomePage';
import SingleProduct from '../pages/SingleProduct';
import UserLogin from '../component/UserLogin';
import RegisterUser from '../component/RegisterUser';
import CartPage from '../pages/CartPage';
import ErrorPage from '../pages/ErrorPage';


const publicRoutes=[
    {
        path:"/",
        component:HomePage,
        exact:true 
    },
    {
        path:"/login",
        component:UserLogin,
        exact:true
    },
    {
        path:"/register",
        component:RegisterUser,
        exact:true 
    },
    {
        path:"/details/:productId",
        component:SingleProduct,
        exact:true 
    },
    {
        path:"/cart",
        component:CartPage,
        exact:true 
    },
    {
        path:"*",
        component:ErrorPage
    }
]

export default publicRoutes;