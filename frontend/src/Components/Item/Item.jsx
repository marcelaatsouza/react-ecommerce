import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/produto/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.imagem} alt="" /></Link>
      <p>{props.nome}</p>
      <div className="item-prices">
        <div className="item-price-new">
            <p>R$ {props.novo_preco}</p>
        </div>
        <div className="item-price-old">
            <p>R$ {props.antigo_preco}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
