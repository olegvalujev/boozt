import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {productAPI} from "../api/api";
import {filterProducts} from "../helpers/product-helpers";

const initialState = {
    products: [] as Array<ProductType>,
    pageSize: 10,
    totalProductsCount: 0,
    currentPage: 1,
    isFetching: true,
    sort: 'ASC' as SortingType
}

const productReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PRODUCT/REQUEST_PRODUCTS':
            return {
                ...state,
                products: [...action.products]
            }
        case 'SN/PRODUCT/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'SN/PRODUCT/SET_PRODUCTS':
            return {...state, products: [...action.products]}
        case 'SN/PRODUCT/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SN/PRODUCT/SET_PRODUCTS_TOTAL_COUNT':
            return {...state, totalProductsCount: action.totalProductsCount}
        case "SN/PRODUCT/SET_PRODUCTS_SORT_ORDER":
            return {...state, sort: action.sortOrder}
        default:
            return state
    }
}

export const actions = {
    requestProducts: (products: Array<ProductType>) => ({type: 'SN/PRODUCT/REQUEST_PRODUCTS', products} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/PRODUCT/TOGGLE_IS_FETCHING', isFetching} as const),
    setProducts: (products: Array<ProductType>) => ({type: 'SN/PRODUCT/SET_PRODUCTS', products} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/PRODUCT/SET_CURRENT_PAGE', currentPage} as const),
    setProductsTotalCount: (totalProductsCount: number) => ({type: 'SN/PRODUCT/SET_PRODUCTS_TOTAL_COUNT', totalProductsCount} as const),
    setSortOrder: (sortOrder: SortingType) => ({type: 'SN/PRODUCT/SET_PRODUCTS_SORT_ORDER', sortOrder} as const),
}

export const requestProducts = (page: number, pageSize: number, sort: SortingType): ThunkType => async (dispatch) =>  {
    dispatch(actions.toggleIsFetching(true))
    const products = await productAPI.getProducts(sort)
    const filteredProducts = filterProducts(products, page, pageSize)

    dispatch(actions.setProductsTotalCount(products.length))
    dispatch(actions.toggleIsFetching(false))

    dispatch(actions.setProducts(filteredProducts))
}

export default productReducer

export type ProductType = {
    id: string
    product_name: string
    brand_name: string
    actual_price: string
    base_price: string
    filename: string
}

export type SortingType = 'ASC' | 'DESC'

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>