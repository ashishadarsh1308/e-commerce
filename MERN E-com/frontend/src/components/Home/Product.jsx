import React from 'react'
import { Link } from 'react-router-dom'
import ReactStarts from 'react-rating-stars-component'


const Product = ({ product }) => { // Updated prop name to 'product'
    const options = {
        value: product.ratings,
        edit: false,
        activeColor: 'tomato',
        color: 'rgb(20,20,20,0.1)',
        isHalf: true,
        precision: 0.5,
        size: window.innerWidth < 768 ? 20 : 25
    }
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStarts {...options} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹ ${product.price}`}</span>
        </Link>
    )
}

export default Product
