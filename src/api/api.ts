import {default as products} from '../data/product_list.json'
import {ProductType} from "../redux/product-reducer";

export const productAPI = {
    getProducts(): Array<ProductType> {
        return products
    }
}