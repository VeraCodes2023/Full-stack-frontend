import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import {faGauge} from '@fortawesome/free-solid-svg-icons'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@mui/material/Badge';
import {useAppDisPatch} from '../redux/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import {useAppSelector} from '../redux/hooks/useAppSelector';
import {logOut}from '../redux/reducers/usersSlice';
import {useTheme} from '../shared/ThemeContext';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';


const HeaderLogOut:React.FC = () => {
  
    const dispatch =useAppDisPatch()
    const {loginUser} = useAppSelector(state=>state.usersReducer)
    const cart = useAppSelector(state=>state.cartReducer)
    const redirect = useNavigate()
    const {toggleTheme } = useTheme(); 

    const logoutHandler = ()=>{
      dispatch(logOut({}))
      redirect('/',{replace:true})
    }

  return (
    <header id='header'>
        <div className="headerTop">
          <div className="headerTopMain">
              <div className="left">
                  <h5>Wecome to Gmall</h5>
                  <h5 style={{color:"rgb(255, 115, 0)"}}>{loginUser && loginUser.name}</h5>
                  <nav>
                      < button onClick={()=>logoutHandler()} className="logoutBtn">Log Out</button>
                  </nav>
              </div>
              <div className="right">
                  <nav>   
                    <NavLink to="/"
                     style={({ isActive}) => 
                     {return {color: isActive ? "rgb(255, 115, 0)" : "grey"}}}
                    >
                      <FontAwesomeIcon icon={faHouse} />
                    </NavLink>
                    <NavLink to="/cart"
                     style={({ isActive}) => 
                     {return {color: isActive ? "rgb(255, 115, 0)" : "grey"}}}
                    >
                        <Badge badgeContent={cart.length}  color='warning'>
                            <ShoppingCartIcon />
                        </Badge>
                    </NavLink>
                    <NavLink to="/profile"
                     style={({isActive}) => 
                     {return {color: isActive ? "rgb(255, 115, 0)" : "grey"}}}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                    {
                      loginUser !==null && loginUser !==undefined&& loginUser.role==="admin"?
                      <NavLink to="/admin"
                      style={({isActive}) => 
                      {return {color: isActive ? "rgb(255, 115, 0)" : "grey"}}}
                     >
                         <FontAwesomeIcon icon={faGauge} />
                     </NavLink> 
                     :null
                    }
                  </nav>
                  <FontAwesomeIcon icon={faToggleOn} onClick={toggleTheme} className="themebtn"/>
              </div>
          </div>
        </div>
    </header>
  )
}
export default HeaderLogOut;