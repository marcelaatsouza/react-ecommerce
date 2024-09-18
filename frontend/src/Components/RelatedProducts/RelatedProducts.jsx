import React from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';

const RelatedProducts = (props) => {
  const { products } = props;

  return (
    <div className='relatedproducts'>
      <h1>Produtos Relacionados</h1>
      <hr />
      <div className="relatedproducts-item">
        {products.map((item, i) => (
          <Item key={i} id={item.id} nome={item.nome} imagem={item.imagem} novo_preco={item.novo_preco} antigo_preco={item.antigo_preco} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;