import React from "react";
import {connect} from "react-redux";
import {
    ProductType,
    requestProducts,
    actions as productActions, SortingType
} from "../../redux/product-reducer";
import ProductList from "./ProductList";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getProducts, getSortOrder,
    getTotalProductsCount
} from "../../redux/product-selectors";
import styled from "styled-components";


class ProductListContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, sort} = this.props
        this.props.requestProducts(currentPage, pageSize, sort)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, sort} = this.props
        this.props.setCurrentPage(pageNumber)
        this.props.requestProducts(pageNumber, pageSize, sort)
    }

    onSortOrderChanged = (sort: SortingType) => {
        const {currentPage, pageSize} = this.props
        this.props.setSortingOrder(sort)
        this.props.requestProducts(currentPage, pageSize, sort)
    }

    render() {
        if (this.props.isFetching) return <Preloader/>

        return <>
            <PageTitle>{this.props.pageTitle}</PageTitle>
            <ProductList
                totalProductsCount={this.props.totalProductsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                products={this.props.products}
                sortOrder={this.props.sort}
                onPageChanged={this.onPageChanged}
                onSortOrderChanged={this.onSortOrderChanged}
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
        totalProductsCount: getTotalProductsCount(state),
        sort: getSortOrder(state)
    }
};


export default compose(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState> as a reference for me
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {
            setCurrentPage: productActions.setCurrentPage,
            setSortingOrder: productActions.setSortOrder,
            requestProducts
        })
)(ProductListContainer)


type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalProductsCount: number
    products: Array<ProductType>
    sort: SortingType
}
type MapDispatchPropsType = {
    requestProducts: (currentPage: number, pageSize: number, sort: SortingType) => void
    setCurrentPage: (pageNumber: number) => void
    setSortingOrder: (sort: SortingType) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const PageTitle = styled.h2`
        text-align: center;
    `