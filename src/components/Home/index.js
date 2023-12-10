// Write your JS code here

import {Component} from 'react'
import Header from '../Header/index'
import './index.css'

class Home extends Component {
  redirectToProductsPage = () => {
    const {history} = this.props
    history.replace('/products')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home_bg_container">
          <div className="shop_now_card_container">
            <div className="show_now_card_details">
              <h1 className="show_now_main_heading">
                Clothes That Get You Noticed
              </h1>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="clothes that get you noticed"
                className="show_now_card_img_element_sm"
              />
              <p className="shop_now_description">
                Fashion is part of the daily air and it does not quit help that
                it changes all the time . Clothes have always been a maker of
                the era and we are in a revolution. Your fashion makes you been
                seen and heard that way you are. So, celebrate the seasons new
                and exciting fashion in your own way.
              </p>
              <div className="show_now_button_container">
                <button
                  className="show_now_button_element"
                  type="button"
                  onClick={this.redirectToProductsPage}
                >
                  Shop Now
                </button>
              </div>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
              alt="clothes that get you noticed"
              className="show_now_card_img_element"
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Home
