import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/populares').then((response) => response.json()).then((data) => setPopularProducts(data));
  }, []);

  return (
    <div className='popular'>
      <h1>Em alta</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
            return <Item key={i} id={item.id} nome={item.nome} imagem={item.imagem} novo_preco={item.novo_preco} antigo_preco={item.antigo_preco}/>
          })}
      </div>
    </div>
  );
};

export default Popular;
