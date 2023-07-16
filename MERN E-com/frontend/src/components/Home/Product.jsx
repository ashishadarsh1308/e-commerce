import React from 'react'
import { Link } from 'react-router-dom'
import ReactStarts from 'react-rating-stars-component'

const options = {
    value: 2.5,
    edit: false,
    activeColor: 'tomato',
    color: 'rgb(20,20,20,0.1)',
    isHalf: true,
    precision: 0.5,
    size: window.innerWidth < 768 ? 20 : 25
}

const Product = ({ product }) => { // Updated prop name to 'product'
    return (
        <Link className='productCard' to={product._id}>
            <img src={product.image} alt={product.name} /> {/* Updated image source */}
            <p>{product.name}</p>
            <div>
                <ReactStarts {...options} />
                <span className='productCardSpan'>(234 Reviews)</span>
            </div>
            <span>${product.price}</span>
        </Link>
    )
}

export default Product
