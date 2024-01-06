import React from "react";
import {
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  ProductButtons,
  Button,
} from "./ProductSelect.style";

const ProductSelect = () => {
  return (
    <ProductCard>
      <ProductImage
        src="https://www.example.com/images/rosca-de-reyes.jpg"
        alt="Rosca de Reyes"
      />
      <ProductInfo>
        <ProductTitle>Rosca de Reyes Tradicional</ProductTitle>
        <ProductDescription>Rosca de reyes de 1.8 kg</ProductDescription>
        <ProductPrice>$349.00</ProductPrice>
      </ProductInfo>
      <ProductButtons>
        <Button>Agregar al carrito</Button>
      </ProductButtons>
    </ProductCard>
  );
};

export default ProductSelect;
