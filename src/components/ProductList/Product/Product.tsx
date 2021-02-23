import React from 'react'
import {ProductType} from "../../../redux/product-reducer";

const Product: React.FC<PropsType> = ({product}) => {
    return (
        <div>
            <div>
                <img src={product.filename} alt={'Product image'}/>
            </div>

            <div>
                <div><span>Product name: </span>{product.product_name}</div>
                <div><span>Brand name: </span>{product.brand_name}</div>
                <div><span>Actual Price: </span>{product.actual_price}</div>
                <div><span>Base Price: </span>{product.base_price}</div>
            </div>
        </div>
    )
}

export default Product

type PropsType = {
    product: ProductType
}