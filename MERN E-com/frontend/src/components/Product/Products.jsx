import React, { Fragment, useEffect } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'

const Products = () => {

  const dispatch = useDispatch()
  const alert = useAlert()

  const { keyword } = useParams()


  const { products, loading, error } = useSelector(
    state => state.products
  )

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword))
  }, [dispatch, alert, error])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className='productsHeading'>Products</h2>

          <div className="products">
            {products && products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products