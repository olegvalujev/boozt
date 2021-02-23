import {createSelector} from 'reselect'
import {AppStateType} from './redux-store'
import {ProductType} from './product-reducer'

export const getProducts = (state: AppStateType): Array<ProductType> => {
    return state.products.products
}
export const getFiltered = createSelector(getProducts, (products) => {
    return products.filter(product => true)
})
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
