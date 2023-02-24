import React from 'react';
import Logo from '../../Logo.png'
import { Link, NavLink } from 'react-router-dom'
import './header.css';

function Header(){
  return (
    <header className='header'>
        <Link to="/" className='header_logo'><img src={Logo} alt="Logo" /></Link>
        <nav className='header_nav'>
            <div className='header_links'>
                <NavLink to="">Inicio</NavLink>
                <NavLink to="product-list">Lista de productos</NavLink>
            </div>
        </nav>
    </header>
  )
}

export default Header;


