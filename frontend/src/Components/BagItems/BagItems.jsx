import React, { useContext } from 'react';
import './BagItems.css';
import { CommerceContext } from '../../Context/CommerceContext';
import empty_bag from '../Assets/emptybag-img.png'
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '20px',
    width: '80px',
    height: '20px',
    padding: '0px 5px',
    fontSize: '12px',
    border: '1px solid #e3e3e3',
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
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '20px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0px 5px',
    width: '25px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    padding: '5px',
    backgroundColor: state.isSelected ? '#000' : '#fff',
    color: state.isSelected ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
  }),
};

const BagItems = () => {
  const { all_product, bagItems, changeSize, changeQuantity, getTotalBagAmount } = useContext(CommerceContext);

  const isBagEmpty = all_product.every((e) => bagItems[e.id]?.quantidade === 0);

  return (
    <div className='bagitems'>
      <div className="bagitems-left">
        {isBagEmpty ? (
          <div className="bagitems-empty">
            <img src={empty_bag} alt="" />
          </div>
        ) : (
          all_product.map((e) => {
            if (bagItems[e.id]?.quantidade > 0) {
              return (
                <div className='bagitems-content' key={e.id}>
                  <div className="product-img">
                    <img src={e.imagem} alt="" className="product-icon" />
                  </div>
                  <div className="bagitems-details">
                    <p className='product-name'>{e.nome}</p>
                    <div className="bagitems-size">
                      <span>Tamanho: </span>
                      <Select
                        value={{ value: bagItems[e.id].tamanho, label: bagItems[e.id].tamanho }}
                        onChange={(selectedOption) => changeSize(e.id, selectedOption.value)}
                        options={e.tamanhos.map(tamanho => ({ value: tamanho, label: tamanho }))}
                        styles={customStyles}
                        isSearchable={false}
                      />
                    </div>
                    <div className="bagitems-quantity">
                      <span>Quantidade: </span>
                      <div className="quantity-box">
                        <button onClick={() => changeQuantity(e.id, "decrease")}>-</button>
                        <div className="quantity">{bagItems[e.id].quantidade}</div>
                        <button onClick={() => changeQuantity(e.id, "increase")}>+</button>
                      </div>
                    </div>
                    <div className="product-prices">
                      <p className='old-price'>R$ {e.antigo_preco.toFixed(2).replace(".", ",")}</p>
                      <p className='new-price'>R$ {e.novo_preco.toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
      <div className="bagitems-right">
        <div className="bagitems-total">
          <h2>Resumo do Pedido</h2>
          <div>
            <div className="bagitems-total-item">
              <p>Subtotal</p>
              <p>$ {getTotalBagAmount()}</p>
            </div>
            <hr />
            <div className="bagitems-total-item">
              <p>Envio</p>
              <p>Grátis</p>
            </div>
            <hr />
            <div className="bagitems-total-item">
              <h3>Total</h3>
              <p>$ {getTotalBagAmount()}</p>
            </div>
            <button>Ir para o pagamento</button>
          </div>
          <div className="bagitems-promocode">
            <p>Insira o código promocional</p>
            <div className="bagitems-promobox">
              <input type="text" />
              <button>Aplicar cupom</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagItems;
