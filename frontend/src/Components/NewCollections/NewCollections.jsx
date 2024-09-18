import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {

  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections').then((response) => response.json()).then((data) => setNew_collection(data));
  }, []);

  return (
    <div className='new-collections'>
      <h1>Novas Coleções</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
            return <Item key={i} id={item.id} nome={item.nome} imagem={item.imagem} novo_preco={item.novo_preco} antigo_preco={item.antigo_preco}/>
        })}
      </div>
    </div>
  );
};

export default NewCollections;
