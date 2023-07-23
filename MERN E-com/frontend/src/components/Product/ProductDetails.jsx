import React, { Fragment, useEffect, useState } from 'react'
import { getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { addToCart } from '../../actions/cartAction'
import './ProductDetails.css'
import ReactStarts from 'react-rating-stars-component'
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { product, loading, error } = useSelector(
        state => state.productDetails
    )

    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const alert = useAlert()

    const addToCartHandler = () => {
        dispatch(addToCart(id, quantity))
        alert.success('Item Added to Cart')
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        if (id && id !== '') {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id, error, alert]);

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
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment  >
                    <MetaData title={product.name} />
                    <div className="ProductDetails">
                        <div>

                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={i}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStarts {...options} />{" "}
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹ ${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button className="submitReview">Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment >
            )}
        </Fragment>
    )
}

export default ProductDetails;
