import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@mui/material/Badge';
import {useAppSelector} from '../redux/hooks/useAppSelector';
import {useTheme} from '../shared/ThemeContext';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';


const HeaderLogIn = () => {
  const {toggleTheme } = useTheme(); 
  const cart = useAppSelector(state=>state.cartReducer)
  return (
    <header id='header'>
        <div className="headerTop">
          <div className="headerTopMain">
              <div className="left">
                  <h5>Wecome to Gmall</h5>
                  <nav>
                      <NavLink to="/login">Login</NavLink>
                      <NavLink to="/register">Sign up</NavLink>
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
                     style={({ isActive}) => 
                     {return {color: isActive ? "rgb(255, 115, 0)" : "grey"}}}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                   
                  </nav>
                  <FontAwesomeIcon icon={faToggleOn} onClick={toggleTheme} className="themebtn"/>
              </div>
            
          </div>
       
        </div>
     
    </header>
  )
}
export default HeaderLogIn