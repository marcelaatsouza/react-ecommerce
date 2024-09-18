import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.png';
import Select from 'react-select';

const options = [
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'acessorios', label: 'Acessórios' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    height: '50px',
    padding: '0px 15px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #000',
    borderRadius: '0px',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #000',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '20px',
    padding: '0',
  }),
  input: (provided) => ({
    ...provided,
    height: '20px',
    padding: '0',
  }),
  
  option: (provided, state) => ({
    ...provided,
    fontSize: '16px',
    fontWeight: '500',
    padding: '5px',
    backgroundColor: state.isSelected ? '#000' : '#fff',
    color: state.isSelected ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: '#e3e3e3',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '15px',
    marginTop: '4px',
    maxHeight: '200px',
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: '0px',
    padding: '0',
    maxHeight: '200px',
    overflowY: 'auto',
  }),
};

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    nome: "",
    imagem: "",
    categoria: options[0],
    tamanhos: "",
    novo_preco: "",
    antigo_preco: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (selectedOption) => {
    if (selectedOption) {
      setProductDetails({ ...productDetails, categoria: selectedOption });
    }
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = { ...productDetails, categoria: productDetails.categoria.value }; // Obtém o valor da categoria

    let formData = new FormData();
    formData.append('produto', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {
      product.imagem = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert('Produto Adicionado') : alert('Falha ao adicionar produto');
      });
    }
  };

  return (
    <div className='add-product'>
      <h1>Adicionar Produto</h1>
      <div className="addproduct-itemfield">
        <p>Título do Produto</p>
        <input
          value={productDetails.nome}
          onChange={(e) => setProductDetails({ ...productDetails, nome: e.target.value })}
          type="text"
          name='nome'
          placeholder='Digite aqui'
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Preço</p>
          <input
            value={productDetails.antigo_preco}
            onChange={(e) => setProductDetails({ ...productDetails, antigo_preco: e.target.value })}
            type="text"
            name="antigo_preco"
            placeholder='Digite aqui'
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Preço de Oferta</p>
          <input
            value={productDetails.novo_preco}
            onChange={(e) => setProductDetails({ ...productDetails, novo_preco: e.target.value })}
            type="text"
            name="novo_preco"
            placeholder='Digite aqui'
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Tamanhos Disponíveis</p>
        <input
          value={productDetails.tamanhos}
          type="text"
          name="tamanhos"
          placeholder='Separe por vírgulas'
          onChange={(e) => setProductDetails({ ...productDetails, tamanhos: e.target.value })}
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Categoria</p>
        <Select
          value={productDetails.categoria}
          onChange={changeHandler}
          name="categoria"
          className='add-product-selector'
          options={options}
          styles={customStyles}
          isSearchable={false}
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Imagem</p>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' />
        </label>
        <input onChange={imageHandler} type="file" name="imagem" id="file-input" hidden />
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>Enviar</button>
    </div>
  );
};

export default AddProduct;