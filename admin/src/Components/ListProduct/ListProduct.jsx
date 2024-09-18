import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/x.svg';
import empty_productlist from '../../assets/empty-productlist.png'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>Todos os Produtos</h1>
      <div className="listproduct-allproducts">
        {allproducts.length === 0 ? (
          <div className="listproduct-empty">
            <img src={empty_productlist} />
          </div>
        ) : (
          allproducts.map((product, index) => (
            <div key={index}>
              <div className="listproduct-content">
                <div className="product-img">
                  <img src={product.imagem} className="product-img" alt={product.nome} />
                </div>
                <div className="listproduct-details">
                  <p className='product-name'>{product.nome}</p>
                  <div className="product-info product-prices">
                    <div className="product-info">
                      <span>Preço:</span>
                      <p className='product-oldprice'>$ {product.antigo_preco}</p>
                    </div>
                    <div className="product-info">
                      <span>Preço de Oferta:</span>
                      <p className='product-newprice'>$ {product.novo_preco}</p>
                    </div>
                  </div>
                  <div className="product-info productsizes-content">
                    <span>Tamanhos Disponíveis:</span>
                    <p className='product-sizes'>
                      {product.tamanhos.join(' | ')}
                    </p>
                  </div>
                  <div className="product-info">
                    <span>Categoria:</span>
                    <p className='product-category'>{product.categoria}</p>
                  </div>
                </div>
                <img
                  onClick={() => { remove_product(product.id); }}
                  className='listproduct-remove-icon'
                  src={remove_icon}
                  alt="Remover produto"
                />
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
