import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {productAPI} from "../api/api";

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
        default:
            return state
    }
}

export const actions = {
    requestProducts: (products: Array<ProductType>) => ({type: 'SN/PRODUCT/REQUEST_PRODUCTS', products: products} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/PRODUCT/TOGGLE_IS_FETCHING', isFetching} as const),
    setProducts: (products: Array<ProductType>) => ({type: 'SN/PRODUCT/SET_PRODUCTS', products} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/PRODUCT/SET_CURRENT_PAGE', currentPage} as const),
}

export const requestProducts = (page: number, pageSize: number): ThunkType => async (dispatch) =>  {
    dispatch(actions.toggleIsFetching(true))
    const products = await productAPI.getProducts()
    dispatch(actions.toggleIsFetching(false))

    dispatch(actions.setProducts(products))
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

const initialState = {
    products: [] as Array<ProductType>,
    pageSize: 10,
    totalProductsCount: 0,
    currentPage: 1,
    isFetching: true
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>