import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from "r-range-slider";

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 50000]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false); // State to track if search button is clicked

  const dispatch = useDispatch()
  const alert = useAlert()

  const { keyword } = useParams()

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const priceHandler = (data) => {
    setPrice(data)
  }

  const handleSearch = () => {
    setSearchButtonClicked(true);
  };

  const { products, loading, error, productsCount, resultPerPage,  } = useSelector(
    state => state.products
  )

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword, currentPage, price))
  }, [dispatch, alert, error, currentPage, keyword, price])

  useEffect(() => {
    if (searchButtonClicked) {
      dispatch(getProducts(keyword, currentPage, price))
      setSearchButtonClicked(false);
    }
  }, [dispatch, searchButtonClicked, keyword, currentPage, price]);

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

          <div className="filterBox">
            <Slider
              onChange={priceHandler}
              attrs={{ className: 'my-slider' }}
              start={0}
              end={50000}
              points={price}
              fillStyle={(index) => {
                if (index === 1) {
                  return { background: 'tomato' };
                }
              }}
              markStyle={(index) => {
                if (index === 0 || index === 2) {
                  return { background: 'tomato' };
                }
              }}
            />
            <button className='pricebutton' onClick={handleSearch}>Rs. 🔍</button>
          </div>

          {resultPerPage <= productsCount && (
            <div className="paginationBox">
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
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;