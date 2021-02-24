import {default as products} from '../data/product_list.json'
import {ProductType, SortingType} from "../redux/product-reducer";

export const productAPI = {
    getProducts(sort: SortingType): Array<ProductType> {
        const preSortedProducts = products.sort((a, b) => parseFloat(a.actual_price) - parseFloat(b.actual_price))
        switch (sort) {
            case 'DESC':
                return preSortedProducts.reverse()
            default:
                return preSortedProducts
        }
    }
}