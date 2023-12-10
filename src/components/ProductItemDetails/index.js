// Write your code here
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header/index'
import SimilarProductItem from '../SimilarProductItem/index'
import CartContext from '../../context/CartContext'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    similarProductDetails: [],
    activeStatus: apiStatusConstant.initial,
    quantityCount: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({activeStatus: apiStatusConstant.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Beaber ${jwtToken}`,
      },
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const similarProductsData = data.similar_products
      //   console.log('fetched_product_details', data)
      const updatedProductDetails = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }
      console.log('updated_product_details_list', updatedProductDetails)
      const updatedSimilarProducts = similarProductsData.map(eachProduct => ({
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        title: eachProduct.title,
        style: eachProduct.style,
        price: eachProduct.price,
        description: eachProduct.description,
        brand: eachProduct.brand,
        totalReviews: eachProduct.total_reviews,
        rating: eachProduct.rating,
        availability: eachProduct.availability,
      }))

      this.setState({
        productDetails: updatedProductDetails,
        similarProductDetails: updatedSimilarProducts,
        activeStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({activeStatus: apiStatusConstant.failure})
    }
  }

  onClickDecreaseQuantity = () => {
    const {quantityCount} = this.state
    if (quantityCount > 1) {
      this.setState(prevState => ({quantityCount: prevState.quantityCount - 1}))
    }
  }

  onClickIncreaseQuantity = () => {
    this.setState(prevState => ({quantityCount: prevState.quantityCount + 1}))
  }

  showProductDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const {
          productDetails,
          quantityCount,
          similarProductDetails,
        } = this.state
        const {
          imageUrl,
          title,
          price,
          description,
          brand,
          totalReviews,
          rating,
          availability,
        } = productDetails
        const onClickAddCartItem = () => {
          addCartItem({...productDetails, quantityCount})
        }

        return (
          <div className="product_details_and_similar_products_bg_container">
            <div className="product_details_bg_container">
              <img
                src={imageUrl}
                alt="product"
                className="product_image_element"
              />
              <div className="product_details_card_container">
                <h1 className="product_title_heading_element">{title}</h1>
                <p className="product_details_price_element">{`Rs ${price}/-`}</p>
                <div className="product_details_rating_container">
                  <p className="product_details_rating_element">
                    {`${rating}`}
                    <span>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="star_img_element"
                      />
                    </span>
                  </p>
                  <p className="review_count_element">{`${totalReviews} Reviews`}</p>
                </div>
                <p className="product_description">{description}</p>
                <p className="availability_count_element">
                  <span className="availability_element">Availability: </span>
                  {availability}
                </p>
                <p className="brand_count_element">
                  <span className="product_details_brand_element">Brand: </span>
                  {brand}
                </p>

                <hr className="hr_line" />
                <div className="quantity_container">
                  <button
                    type="button"
                    className="quantity_symbols_button"
                    data-testid="minus"
                    onClick={this.onClickDecreaseQuantity}
                    aria-label="decrease"
                  >
                    <BsDashSquare className="quantity_symbols" />
                  </button>
                  <div>
                    <p className="quantity_count">{quantityCount}</p>
                  </div>
                  <button
                    type="button"
                    className="quantity_symbols_button"
                    data-testid="plus"
                    onClick={this.onClickIncreaseQuantity}
                    aria-label="Increase"
                  >
                    <BsPlusSquare className="quantity_symbols" />
                  </button>
                </div>
                <button
                  className="add_to_cart_button"
                  type="button"
                  onClick={onClickAddCartItem}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="similar_products_container">
              <h1 className="similar_products_heading_elements">
                Similar Products
                <ul className="similar_products_list_bg_container">
                  {similarProductDetails.map(eachProduct => (
                    <SimilarProductItem
                      productDetails={eachProduct}
                      key={eachProduct.id}
                    />
                  ))}
                </ul>
              </h1>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="products_details_loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onClickContinueShoppingButton = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="failure_view_bg_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="failure_view_img_element"
      />
      <h1 className="error_view_heading">Product Not Found</h1>
      <div className="button_bg_container">
        <button
          className="continue_shopping_button"
          type="button"
          onClick={this.onClickContinueShoppingButton}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )

  showResults = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatusConstant.loading:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.showProductDetails()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product_details_route_bg_container">
          {this.showResults()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
