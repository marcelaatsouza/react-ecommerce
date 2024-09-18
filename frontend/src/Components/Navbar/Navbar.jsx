import React, { useContext, useState } from 'react';
import './Navbar.css';
import bag_icon from '../Assets/bag.svg';
import { Link } from 'react-router-dom';
import menu_icon from '../Assets/list.svg';
import { CommerceContext } from '../../Context/CommerceContext';

const Navbar = () => {
    const [menu, setMenu] = useState('home');
    const [active, setActive] = useState('nav-menu');
    const navToggle = () => {
      active === 'nav-menu' ? setActive('nav-menu nav-active') : setActive('nav-menu');
    };
    const {getTotalBagItems} = useContext(CommerceContext);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <p>VOUS&CO.</p>
      </div>
      <ul className={active}>
        <li onClick={() => {setMenu('home')}}><Link style={{textDecoration: 'none'}} to='/'>Home</Link>{menu==='home'?<hr/>:<></>}</li>
        <li onClick={() => {setMenu('feminino')}}><Link style={{textDecoration: 'none'}} to='/feminino'>Feminino</Link> {menu==='feminino'?<hr/>:<></>}</li>
        <li onClick={() => {setMenu('masculino')}}><Link style={{textDecoration: 'none'}} to='/masculino'>Masculino</Link> {menu==='masculino'?<hr/>:<></>}</li>
        <li onClick={() => {setMenu('acessorios')}}><Link style={{textDecoration: 'none'}} to='/acessorios'>Acessórios</Link> {menu==='acessorios'?<hr/>:<></>}</li>
        {active === 'nav-menu nav-active' && (
          <>
            <li className='' onClick={() => {setMenu('login')}}><Link style={{textDecoration: 'none'}} to='/login'>Login</Link> {menu==='login'?<hr/>:<></>}</li>
            <li className='' onClick={() => {setMenu('sacola')}}><Link style={{textDecoration: 'none'}} to='/sacola'>Sacola</Link> {menu==='sacola'?<hr/>:<></>}</li>
          </>
        )}
      </ul>
        <div className="nav-login-bag">
          {localStorage.getItem('auth-token') ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
          <Link to='/sacola'><img src={bag_icon} alt="Ícone Sacola" /></Link>
            <div className="nav-bag-count">{getTotalBagItems()}</div>
        </div>
      <div onClick={navToggle} className="nav-toggle">
        <img src={menu_icon}/>
      </div>
    </nav>
  );
};

export default Navbar;
