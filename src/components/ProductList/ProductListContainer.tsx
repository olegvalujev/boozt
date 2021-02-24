import React from "react";
import {connect} from "react-redux";
import {
    ProductType,
    requestProducts,
    actions as productActions
} from "../../redux/product-reducer";
import ProductList from "./ProductList";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getProducts,
    getTotalProductsCount
} from "../../redux/product-selectors";
import styled from "styled-components";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalProductsCount: number
    products: Array<ProductType>
}
type MapDispatchPropsType = {
    requestProducts: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProductListContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestProducts(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.setCurrentPage(pageNumber)
        this.props.requestProducts(pageNumber, pageSize)
    }

    render() {
        if (this.props.isFetching) return <Preloader/>

        return <>
            <PageTitle>{this.props.pageTitle}</PageTitle>
            <ProductList
                totalProductsCount={this.props.totalProductsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                products={this.props.products}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        products: getProducts(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        totalProductsCount: getTotalProductsCount(state)
    }
};


export default compose(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState> as a reference for me
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {
            setCurrentPage: productActions.setCurrentPage,
            requestProducts
        })
)(ProductListContainer)

const PageTitle = styled.h2`
        text-align: center;
    `