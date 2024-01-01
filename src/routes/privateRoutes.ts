import UserProfilePage from '../pages/UserProfilePage';
import ProfileUpdate from '../component/ProfileUpdate';
import OrderPage from '../pages/OrderPage';

const privateRoutes =[
    { 
        path:"/profile",
        component:UserProfilePage
    },
    {
        path:"/order",
        component:OrderPage
    },
    {
        path:"/profileUpdate",
        component:ProfileUpdate
    }
  
]

export default privateRoutes