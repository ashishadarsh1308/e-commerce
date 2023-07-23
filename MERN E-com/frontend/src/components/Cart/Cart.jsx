import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'

const Cart = () => {

    const item = {
        name: "Product Name",
        price: 100,
        quantity: 1,
        image: "/images/profile.png"
    }

    const increaseQuantity = () => { };

    const decreaseQuantity = () => { };

    return (
        <Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>
                <div className='cartContainer'>
                    <CartItemCard item={item} />
                    <div className="cartInput">
                        <button
                            onClick={() =>
                                decreaseQuantity(item.product, item.quantity)
                            }
                        >
                            -
                        </button>
                        <input type="number" value={item.quantity} />
                        <button
                            onClick={() =>
                                increaseQuantity(
                                    item.product,
                                    item.quantity,
                                    item.stock
                                )
                            }
                        >
                            +
                        </button>
                    </div>
                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                </div>
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
        </Fragment>
    )
}

export default Cart