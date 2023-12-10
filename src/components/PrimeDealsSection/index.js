import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductsCard from '../ProductCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

class PrimeDealsSection extends Component {
  state = {primeDeals: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.setState({apiStatus: apiStatusConstant.loading})
    this.fetchPrimeDetails()
  }

  fetchPrimeDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.prime_deals.map(product => ({
        title: product.title,
        brand: product.brand,
        rating: product.rating,
        id: product.id,
        imageUrl: product.image_url,
        price: product.price,
      }))
      this.setState({
        primeDeals: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderPrimeDeals = () => {
    const {primeDeals} = this.state
    return (
      <div>
        <h1 className="prime_deals_heading_element">Exclusive Prime Deals</h1>
        <ul className="products_items_display_bg_container">
          {primeDeals.map(eachProduct => (
            <ProductsCard productDetails={eachProduct} key={eachProduct.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderNonPrimeDeals = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register_prime_image"
    />
  )

  renderLoadingPage = () => (
    <div className="products_loader_container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderPrimeDeals()

      case apiStatusConstant.failure:
        return this.renderNonPrimeDeals()
      case apiStatusConstant.loading:
        return this.renderLoadingPage()

      default:
        return null
    }
  }
}
export default PrimeDealsSection
