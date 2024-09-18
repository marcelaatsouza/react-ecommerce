import React from 'react';
import './Footer.css';
import instagram from '../Assets/instagram.svg';
import linkedin from '../Assets/linkedin.svg';
import youtube from '../Assets/youtube.svg';
import pinterest from '../Assets/pinterest.svg';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <h1>VOUS&CO.</h1>
        </div>
        <ul className="footer-links">
            <li>Sobre</li> <hr />
            <li>Produtos</li> <hr />
            <li>Unidades</li> <hr />
            <li>Contato</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram} alt="Instagram Ícone" />
            </div>
            <div className="footer-icons-container">
                <img src={linkedin} alt="Linkedin Ícone" />
            </div>
            <div className="footer-icons-container">
                <img src={youtube} alt="Youtube Ícone" />
            </div>
            <div className="footer-icons-container">
                <img src={pinterest} alt="Pinterest Ícone" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Projeto fictício sem fins comerciais | Desenvolvido por Marcela Ataide</p>
        </div>
    </div>
  );
};

export default Footer;
