import React from 'react'
import './Navbar.css'
import user_icon from '../../assets/person-circle.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo-container">
        <a href='#' className='nav-logo'>VOUS&CO.</a>
        <p>Admin Panel</p>
      </div>
      <div className="user-container">
        <p>Bem-vindo(a)!</p>
        <img src={user_icon} className='user-icon'/>
      </div>
    </div>
  )
}

export default Navbar
