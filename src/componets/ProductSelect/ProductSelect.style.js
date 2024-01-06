import styled from 'styled-components';

export const ProductCard = styled.div`
 width: 300px;
 padding: 20px;
 border: 1px solid #ddd;
 border-radius: 10px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
 margin: 20px;
`;

export const ProductImage = styled.img`
 width: 100%;
 height: auto;
 border-radius: 10px;
`;

export const ProductInfo = styled.div`
 text-align: center;
`;

export const ProductTitle = styled.h3`
 font-size: 24px;
 margin-bottom: 10px;
`;

export const ProductDescription = styled.p`
 font-size: 16px;
 margin-bottom: 10px;
`;

export const ProductPrice = styled.h4`
 font-size: 20px;
 color: #ff9900;
 margin-bottom: 10px;
`;

export const ProductButtons = styled.div`
 display: flex;
 justify-content: space-between;
 width: 100%;
`;

export const Button = styled.button`
 background-color: #008000;
 color: white;
 font-size: 16px;
 padding: 10px 20px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 transition: background-color 0.3s;

 &:hover {
    background-color: #006600;
 }
`;
