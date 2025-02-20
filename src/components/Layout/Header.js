import React from 'react'
import logo from '../../media/images/logo.svg'
import cart from '../../media/images/cart.svg'
import bell from '../../media/images/bell.svg'
import humb from '../../media/images/humb.svg'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../Main/SearchBar'

function Header() {

    const navigate = useNavigate();  // Declare navigate hook here

    const handleLogin = () =>{
        navigate("/register")
    }
  return (
    <>
        <div className='top-nav'>
                <div className='top-nav-logo'>
                    <img src={logo} />
                </div>
                <div className='top-nav-icons'>
                    <div className='top-nav-img-container'>
                        <img src={cart}/>
                        <img src={bell}/>
                    </div>
                        <div className="top-nav-button-container">
                            <button onClick={handleLogin} className="gradient-border-button">Login</button>
                        </div>                    
                </div>
        </div>
        <div className='nav-bar'>
              <div className='container'>
                <div className='nav-bar-flex-class'>
                    <div className='nav-bar-nav-items'>
                        <ul>
                            <li><img src={humb} /> All categories </li>
                            <li>Home</li>
                            <li>Donate now</li>
                            <li>Featured Products</li>
                            <li>Services</li>
                        </ul>
                    </div>
                    <div className='nav-bar-nav-links'>
                        <ul>
                            <li>Get Donation</li>
                            <li>Become a Seller</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default Header
