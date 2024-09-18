import React, { useContext, useEffect, useState } from 'react';
import { CommerceContext } from '../Context/CommerceContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(CommerceContext);
  const { productId } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const product = all_product?.find((e) => e.id === Number(productId));

  useEffect(() => {
    if (product) {
      fetch(`http://localhost:4000/relatedproducts?categoria=${product.categoria}`)
        .then(response => response.json())
        .then(data => setRelatedProducts(data));
    }
  }, [product]);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default Product;