import React from 'react';
import './Banner.css';
import banner from '../Assets/banner.png';

const Banner = () => {
  return (
    <div className='banner'>
      <div className="banner-img">
        <img src={banner} alt="" />
      </div>
      <div className="banner-text">
        <h2>Moda com a sua personalidade.</h2>
        <button href="">Conheça</button>
      </div>
    </div>
  );
};

export default Banner;
