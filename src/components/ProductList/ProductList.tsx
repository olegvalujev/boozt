import React from 'react'
import Product from './Product/Product'
import styled from "styled-components";
import Paginator from "../common/Paginator/Paginator";
import {ProductType} from "../../redux/product-reducer";
import {device} from "../../device/device";

const ProductList: React.FC<PropsType> = ({totalProductsCount, pageSize, onPageChanged, currentPage, products, ...props}) => {
    return <ProductListWrapper>
        <Paginator totalProductsCount={totalProductsCount}
                   pageSize={pageSize}
                   onPageChanged={onPageChanged}
                   currentPage={currentPage}
                   portionSize={10}/>
        <List>
            {products.map(p => (<Product key={p.id} product={p}/>))}
        </List>
    </ProductListWrapper>
}

export default ProductList

const ProductListWrapper = styled.div`
    @media ${device.mobileL} {
        margin: 5px;
    }
    @media ${device.laptop} {
        margin: 0 20px;
`
const List = styled.div`
    @media ${device.mobileL} {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        &:after {
          content: "";
          flex: auto;
        }
    }
`

type PropsType = {
    totalProductsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    products: Array<ProductType>
}