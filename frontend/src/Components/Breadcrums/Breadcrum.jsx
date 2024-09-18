import React from 'react';
import './Breadcrum.css';
import right_arrow from '../Assets/chevron-right.svg';

const Breadcrum = (props) => {
  const {product} = props;

  if (!product) {
    return null;
  }

  return (
    <div className='breadcrum'>
      Home <img src={right_arrow}/>Produtos<img src={right_arrow}/> 
      {product.categoria} <img src={right_arrow}/> {product.nome}
    </div>
  );
};

export default Breadcrum;
