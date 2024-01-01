import {useEffect} from 'react';
import { BrowserRouter,Routes,Route,Navigate  } from 'react-router-dom';
import {useAppSelector} from './redux/hooks/useAppSelector';
import HeaderLogIn from './component/HeaderLogin';
import Footer from './component/Footer';
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';
import adminRoutes from './routes/adminRoutes';
import {nanoid} from 'nanoid';
import HeaderLogOut from './component/HeaderLogout';
import {useTheme} from './shared/ThemeContext';
import  {useAppDisPatch} from './redux/hooks/useAppDispatch';
import  {authenticateUserAsync} from './redux/asyncThunk/userAsync'
import  {fetchAllProducts}from './redux/asyncThunk/productsAsync'



const App = () => {
  const dispatch = useAppDisPatch()
  const { theme} = useTheme(); 
  const loginUser= useAppSelector(state=>state.usersReducer.loginUser)
  const access_token = localStorage.getItem("access_token");
  // console.log(access_token)

  useEffect(()=>{
    dispatch(fetchAllProducts({offset:0, limit:220}))
  },[dispatch])

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    console.log(access_token)
    if (access_token) {
      dispatch(authenticateUserAsync(access_token));
    }
  }, [dispatch]);


  
  return (
    <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
        <BrowserRouter>
            {
              loginUser !==null &&  loginUser !==undefined? 
              <HeaderLogOut/>:<HeaderLogIn/>
            }

          <Routes>
            {
              publicRoutes.map( ({path, component: Component})=><Route 
              key={`privateRoute-${nanoid()}`}
              path={path}
              element={<Component/>}
              ></Route>)
            }
            {
              privateRoutes.map( ({path, component: Component})=>{
                return(<Route
                    key={`privateRoute-${nanoid()}`}
                    path={path}
                    element={(loginUser !==null && loginUser !==undefined) && (loginUser.role ==="Customer" || loginUser.role==="Admin") ?
                    <Component/>: <Navigate to="/login"/>}>
                </Route>)

              })
             
            }
            {
              adminRoutes.map(({path,component:Component})=>{
                return (<Route 
                  key={`adminRoute-${nanoid()}`}
                  path={path}
                  element={ (loginUser !==null && loginUser !==undefined && loginUser.role ==="Admin")?
                  <Component/>:<Navigate to="/login"/>}>
                </Route>)
              })
            }
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App