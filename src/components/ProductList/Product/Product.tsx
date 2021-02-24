import React from 'react'
import {ProductType} from "../../../redux/product-reducer";
import styled from "styled-components";
import {device} from "../../../device/device";

const ProductCard = styled.div`
    
    @media ${device.mobileM} {
        flex: 0 1 calc(50% - 1em);
    }
    @media ${device.laptop} {
        flex: 0 1 calc(25% - 1em);
    }
`

const ProductImage = styled.img`
    max-width: 100%;
    height: auto;
`

const Product: React.FC<PropsType> = ({product}) => {
    return (
        <ProductCard>
            <div>
                <ProductImage src={product.filename} alt={''}/>
            </div>

            <div>
                <div><span>Product name: </span>{product.product_name}</div>
                <div><span>Brand name: </span>{product.brand_name}</div>
                <div><span>Actual Price: </span>{product.actual_price}</div>
                <div><span>Base Price: </span>{product.base_price}</div>
            </div>
        </ProductCard>
    )
}

export default Product

type PropsType = {
    product: ProductType
}