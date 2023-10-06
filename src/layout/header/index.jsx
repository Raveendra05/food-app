import { Link, useNavigate } from 'react-router-dom';
import './index.css';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { CartDispatchProvider } from '../../component/contextReducer';
// import { useState } from 'react';
// import Modal from '../../pages/modal';
// import Cart from '../../component/cart';
// import {createPortal} from 'react-dom';
// const sidebarContentEl = document.getElementById('cart-root');
export default function Header() {
  const {state} = useContext(CartDispatchProvider);
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login')
  }
  // const [cartView, setCartView] = useState(false)
  const cart=()=>{
    
    navigate('/cart')
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand m-2" to='/'>Gofood</Link>
        <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mb-2 me-auto">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to='/'>home </Link>
            </li>
            {
              (localStorage.getItem("authToken"))
                ?
                <li className="nav-item active">
                  <Link className="nav-link active fs-5" to='/myorder'>Orders </Link>
                </li> : ""
            }

          </ul>

          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-dark text-light mx-1" to='/login'>login </Link>
              <Link className="btn bg-dark text-light mx-1" to='/signUp'>signUp</Link>
            </div> :
            <div>
              <div className='btn bg-primary text-light mx-2' onClick={cart}>
                  My Cart {" "}
                  <IconButton aria-label="cart">
                  <StyledBadge badgeContent={state.length} color="warning">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </div>
              <div className='btn bg-dark text-danger mx-2' onClick={handleLogout}>
                Logout
              </div>
            </div>
          }
        </div>
      </nav>
    </div>
  )
}
