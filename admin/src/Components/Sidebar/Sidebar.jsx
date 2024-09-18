import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import bags_icon from '../../assets/bags_icon.png'
import list_icon from '../../assets/list_icon.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'}  style={{textDecoration: "none"}}>
        <div className="sidebar-item">
            <img src={bags_icon} alt="" />
            <p>Adicionar Produto</p>
        </div>
      </Link>
      <Link to={'/listproduct'}  style={{textDecoration: "none"}}>
        <div className="sidebar-item">
            <img src={list_icon} alt="" />
            <p>Listar Produtos</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
