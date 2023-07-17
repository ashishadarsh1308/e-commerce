import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  const alert = useAlert()

  const { keyword } = useParams()

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const { products, loading, error, productsCount, resultPerPage } = useSelector(
    state => state.products
  )

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword, currentPage))
  }, [dispatch, alert, error, currentPage, keyword])

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

          <div className="paginationBox">

            {resultPerPage <= productsCount && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}

          </div>

        </Fragment>
      )}
    </Fragment>
  )
}

export default Products