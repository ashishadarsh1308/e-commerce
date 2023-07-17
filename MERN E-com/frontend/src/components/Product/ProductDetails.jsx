import React from 'react'
import store from '../../store'
import { getProductDetails } from '../../actions/productAction'

// Dispatch the action
store.dispatch(getProductDetails('64b4431b2e8d497401379482'));


console.log(store.getState().productDetails);

const ProductDetails = () => {
    return (
        <div>ProductDetails</div>
    )
}

export default ProductDetails