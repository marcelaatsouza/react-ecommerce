import React, { useContext } from 'react'
import './CSS/Category.css';
import { CommerceContext } from '../Context/CommerceContext';
import Item from '../Components/Item/Item';


const Category = (props) => {
  const {all_product} = useContext(CommerceContext);

  return (
    <div className='category'>
      <img className='category-banner' src={props.banner} alt="" />
      <div className="category-container">
      <div className="category-indexSort">
        <p>
          <span>Mostrando 1-12</span> de 36 produtos
        </p>
        <div className="category-sort">
          Filtrar por <i className='bi bi-chevron-down'/>
        </div>
      </div>
        <div className="category-products">
          {all_product.map((item, i) => {
            if (props.categoria === item.categoria) {
              return <Item key={i} id={item.id} nome={item.nome} imagem={item.imagem} novo_preco={item.novo_preco} antigo_preco={item.antigo_preco}/>
            } else {
              return null;
            }
          })}
        </div>
        <div className="category-loadmore">
          <button>Explorar Mais</button>
        </div>
      </div>
    </div>
  );
};

export default Category;
