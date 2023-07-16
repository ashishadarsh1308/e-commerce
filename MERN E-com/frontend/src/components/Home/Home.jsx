import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import Product from './Product'
import MetaData from '../layout/MetaData'

const product = {
    name: 'Product 1',
    price: 100,
    image: 'https://www.metrol.co.uk/assets/images/computers-square.jpg'
}

const Home = () => {
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>

        </Fragment>
    )
}

export default Home