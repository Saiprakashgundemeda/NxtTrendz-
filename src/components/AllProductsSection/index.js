import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import ProductsCard from '../ProductCard/index'
import ProductsHeader from '../ProductsHeader'
import FilterGroup from '../FiltersGroup/index'

import './index.css'

const sortbyOptions = [
  {
    optionId: 'NONE',
    displayText: 'None',
  },
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const categoryOptions = [
  {
    categoryId: 1,
    name: 'Clothing',
  },
  {
    categoryId: 2,
    name: 'Electronics',
  },
  {
    categoryId: 3,
    name: 'Appliances',
  },
  {
    categoryId: 4,
    name: 'Grocery',
  },
  {
    categoryId: 5,
    name: 'Toys',
  },
]

const ratingOption = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const productsPageStatusOptions = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class AllProductsSection extends Component {
  state = {
    productsData: [],
    pageResultsStatus: productsPageStatusOptions.initial,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    categoryId: '',
    ratingId: '',
  }

  componentDidMount() {
    this.fetchProductsApiData()
  }

  changeSortby = optionId => {
    this.setState(
      {
        pageResultsStatus: productsPageStatusOptions.loading,
        activeOptionId: optionId,
      },
      this.fetchProductsApiData,
    )
  }

  fetchProductsApiData = async () => {
    this.setState({pageResultsStatus: productsPageStatusOptions.loading})
    const {activeOptionId, searchInput, categoryId, ratingId} = this.state

    const jwtToken = Cookies.get('jwt_token')
    console.log('search_input_inside_fetchProducts', searchInput)

    let url
    if (activeOptionId === 'NONE') {
      url = 'https://apis.ccbp.in/products'
    } else {
      url = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchInput}&category=${categoryId}&rating=${ratingId}`
    }
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.products.map(eachProduct => {
        const newProductData = {
          title: eachProduct.title,
          brand: eachProduct.brand,
          price: eachProduct.price,
          imageUrl: eachProduct.image_url,
          id: eachProduct.id,
          rating: eachProduct.rating,
        }
        return newProductData
      })
      this.setState({
        productsData: updatedData,
        pageResultsStatus: productsPageStatusOptions.success,
      })
    } else {
      this.setState({pageResultsStatus: productsPageStatusOptions.failure})
    }
  }

  showProducts = () => {
    const {productsData, activeOptionId} = this.state
    return (
      <>
        <div className="all_products_bg_container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <ul className="products_items_display_bg_container">
            {productsData.map(productItem => (
              <ProductsCard productDetails={productItem} key={productItem.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  showNoProducts = () => (
    <div className="no_products_view_display_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        className="no_products_view_img_element"
        alt="no products"
      />
      <h1 className="no_products_heading_element">No Products Found</h1>
      <p className="no_products_description">
        We could not find any products. Try other filters.
      </p>
    </div>
  )

  changeSearchInput = event => {
    console.log('search_input', event.target.value)
    this.setState({searchInput: event.target.value}, this.fetchProductsApiData)
  }

  categoryChangeBasedOnCategory = id => {
    console.log('changed_category_id', id)
    this.setState({categoryId: id}, this.fetchProductsApiData)
  }

  showProductsBasedOnRating = id => {
    console.log('rating id :', id)
    this.setState({ratingId: id}, this.fetchProductsApiData)
  }

  onClickClearFilter = () => {
    this.setState(
      {
        searchInput: '',
        categoryId: '',
        ratingId: '',
      },
      this.fetchProductsApiData,
    )
  }

  renderLoadingPage = () => (
    <div className="loader_bg_container">
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={60}
        width={60}
        className="loader"
      />
    </div>
  )

  renderProductsPage = isCountEqualsToZero => {
    if (isCountEqualsToZero) {
      return this.showNoProducts()
    }
    return this.showProducts()
  }

  renderFailurePage = () => (
    <div className="failure_page_bg_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure_page_img_element"
      />
      <h1 className="failure_page_main_heading">Oops! Something went wrong</h1>
      <p className="failure_page_description">
        We are having some trouble processing your request.Please try again.
      </p>
    </div>
  )

  showResultsBasedOnPageResultsStatus = (status, isCountEqualsToZero) => {
    switch (status) {
      case productsPageStatusOptions.loading:
        return this.renderLoadingPage()
      case productsPageStatusOptions.success:
        return this.renderProductsPage(isCountEqualsToZero)
      case productsPageStatusOptions.failure:
        return this.renderFailurePage()

      default:
        return null
    }
  }

  render() {
    const {pageResultsStatus, productsData} = this.state
    const isCountEqualsToZero = productsData.length === 0

    return (
      <div className="all_products_and_filters_bg_container">
        <FilterGroup
          categoryOptions={categoryOptions}
          ratingOption={ratingOption}
          changeSearchInput={this.changeSearchInput}
          categoryChangeBasedOnCategory={this.categoryChangeBasedOnCategory}
          showProductsBasedOnRating={this.showProductsBasedOnRating}
          onClickClearFilter={this.onClickClearFilter}
        />
        {this.showResultsBasedOnPageResultsStatus(
          pageResultsStatus,
          isCountEqualsToZero,
        )}
      </div>
    )
  }
}

export default AllProductsSection
