import React, { createContext, useEffect, useState } from "react";

export const CommerceContext = createContext(null);

const getDefaultBag = () => {
    let bag = {};
    for (let index = 0; index < 300 + 1; index++) {
        bag[index] = { quantidade: 0, tamanho: '' };
    };
    return bag;
};

const CommerceContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [bagItems, setBagItems] = useState(getDefaultBag());

    useEffect(() => {
        const savedBag = localStorage.getItem('bagItems');
        if (savedBag) {
            setBagItems(JSON.parse(savedBag));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
    }, [bagItems]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data));
    }, []);

    const changeSize = (itemId, newSize) => {
        setBagItems((prev) => ({
            ...prev,
            [itemId]: { ...prev[itemId], tamanho: newSize }
        }));
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/atualizarsacola', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idProduto: itemId, tamanho: newSize }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };    

    const addToBag = (itemId, tamanho, quantidade = 1) => {
        setBagItems((prev) => ({
            ...prev,
            [itemId]: {
                quantidade: (prev[itemId]?.quantidade || 0) + quantidade,
                tamanho: tamanho || prev[itemId]?.tamanho || '',
            },
        }));
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/adicionarasacola', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idProduto: itemId, quantidade, tamanho }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        };
    };  

    const changeQuantity = (itemId, action) => {
        setBagItems((prev) => {
            const newQuantity = action === "increase" ? prev[itemId].quantidade + 1 : Math.max(0, prev[itemId].quantidade - 1);
            return {
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    quantidade: newQuantity,
                }
            };
        });
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/atualizarsacola', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idProduto: itemId, quantidade: action === "increase" ? 1 : -1 }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        };
    };    

    const removeFromBag = (itemId) => {
        setBagItems((prev) => {
            const updatedBag = { ...prev };
    
            if (updatedBag[itemId].quantidade > 1) {
                updatedBag[itemId].quantidade -= 1;
            } else {
                delete updatedBag[itemId];
            };
            return updatedBag;
        });
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removerdasacola', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        };
    }; 

    const getTotalBagAmount = () => {
        let totalAmount = 0;
        for (const item in bagItems) {
            if (bagItems[item].quantidade > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.novo_preco * bagItems[item].quantidade;
                };
            };
        };
        return totalAmount.toFixed(2).replace(".", ",");
    };

    const getTotalBagItems = () => {
        let totalItem = 0;
        for (const item in bagItems) {
            if (bagItems[item].quantidade > 0) {
                totalItem += bagItems[item].quantidade;
            };
        };
        return totalItem;
    };

    const contextValue = { all_product, bagItems, addToBag, changeSize, changeQuantity, getTotalBagAmount, getTotalBagItems };

    return (
        <CommerceContext.Provider value={contextValue}>
            {props.children}
        </CommerceContext.Provider>
    );
};

export default CommerceContextProvider;