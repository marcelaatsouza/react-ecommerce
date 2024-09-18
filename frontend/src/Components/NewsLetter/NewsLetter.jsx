import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>VOUS&CO.</h1>
        <h2>Esteja sempre atualizado</h2>
        <p>Inscreva-se agora para receber promocões e novidades em primeira mão</p>
        <input type="email" placeholder='Seu endereço de e-mail'/>
        <button>Inscrever</button>
    </div>
  );
};

export default NewsLetter;
