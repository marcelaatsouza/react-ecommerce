import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star-fill.svg';
import { CommerceContext } from '../../Context/CommerceContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToBag, changeSize } = useContext(CommerceContext);
    const [selectedSize, setSelectedSize] = useState(null);

    const sizeSelect = (tamanho) => {
        setSelectedSize(tamanho);
    };

    const handleAddToBag = () => {
        if (selectedSize) {
            changeSize(product.id, selectedSize);
            addToBag(product.id, selectedSize, 1);
        } else {
            alert('Por favor, selecione um tamanho');
        };
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <img className='productdisplay-img' src={product.imagem} alt="Produto" />
            </div>
            <div className="productdisplay-right">
                <h1>{product.nome}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.antigo_preco}</div>
                    <div className="productdisplay-right-price-new">${product.novo_preco}</div>
                </div>
                <div className="productdisplay-right-description">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt illum impedit rerum labore quibusdam, architecto consectetur officiis sit. Libero deleniti earum veritatis vero. Non voluptatibus veniam, unde repellat iusto ea.</p>
                </div>
                <div className="productdisplay-right-sizes">
                    <h1>Tamanhos Disponíveis</h1>
                    <div className="productdisplay-right-size">
                        {product.tamanhos.map((tamanho, index) => (
                            <button key={index} onClick={() => sizeSelect(tamanho)} className={selectedSize === tamanho ? 'size-selected' : ''}>
                                {tamanho}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleAddToBag} className='bagbutton-submit'>Adicionar à Sacola</button>
                <p className='productdisplay-right-category'><span>Categoria: </span>{product.categoria}</p>
            </div>
        </div>
    );
};

export default ProductDisplay;