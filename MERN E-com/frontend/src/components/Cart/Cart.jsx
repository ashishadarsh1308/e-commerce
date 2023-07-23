import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeCartItem } from '../../actions/cartAction'

const Cart = () => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const deleteCartItems = (id) => {
        dispatch(removeCartItem(id));
    };

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        dispatch(addToCart(id, newQty));
    };

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <img src="/images/200.gif" alt="Loading animation" />
                    <p className='paraEmpty'> oops! your cart is empty </p>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map((item) => (
                            <div className='cartContainer' key={item.product}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartInput">
                                    <button
                                        onClick={() => decreaseQuantity(item.product, item.quantity)}
                                    >
                                        -
                                    </button>
                                    <input type="number" value={item.quantity} />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                                        +
                                    </button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${600}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button >Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>)}
        </Fragment>
    )
}

export default Cart