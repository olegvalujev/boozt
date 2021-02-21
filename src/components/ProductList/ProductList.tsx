import React from 'react'
import Product from './Product/Product'
import styled from "styled-components";

const ProductListWrapper = styled.div`
    background-color: green;
`
const ProductList = () => {
    return <ProductListWrapper>
        <Product/>
    </ProductListWrapper>
}

export default ProductList