import {ProductType} from "../redux/product-reducer";

export const filterProducts = (products: Array<ProductType>, page: number, pageSize: number): Array<ProductType> => {
    const pageUpperLimit = pageSize * page - 1
    const pageLowerLimit = pageUpperLimit - pageSize + 1
    return products.filter((product, index) => index >= pageLowerLimit && index <= pageUpperLimit)
}