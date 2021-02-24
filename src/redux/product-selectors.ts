import {AppStateType} from './redux-store'
import {ProductType, SortingType} from './product-reducer'

export const getProducts = (state: AppStateType): Array<ProductType> => {
    return state.products.products
}
export const getSortOrder = (state: AppStateType): SortingType => {
    return state.products.sort
}
export const getPageSize = (state: AppStateType) => {
    return state.products.pageSize
}
export const getTotalProductsCount = (state: AppStateType) => {
    return state.products.totalProductsCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.products.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.products.isFetching
}
