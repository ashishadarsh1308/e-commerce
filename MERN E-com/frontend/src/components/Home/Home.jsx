import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import Product from './Product'
import MetaData from '../layout/MetaData'
import { getProducts } from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch()
    const { products, loading, error, productsCount } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <Fragment>

            <MetaData title={'Buy Best Products Online'} />

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className='homeHeading'>Featured Products</h2>

            <div className="container" id="container">
                {products && products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </div>

        </Fragment>
    )
}

export default Home