import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


function Header() {
    return (
        <div className='container nav__container'>
            <Link to='/' className='nav__logo'>
                <img src={Logo} alt="Navbar Logo" />
                <ul className='nav__menu'>
                    <li><Link to='/profile'>Mpho S</Link></li>
                    <li><Link to='/create'>Create Post</Link></li>
                    <li><Link to='/authors'>Authors</Link></li>
                    <li><Link to='/logout'>Logout</Link></li>
                </ul>
                <button className='nav__toggle-btn'>
                <AiOutlineClose />
                </button>
            </Link>
        </div>
    )
}

export default Header