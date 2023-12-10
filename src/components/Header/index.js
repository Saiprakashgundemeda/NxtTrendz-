// Write your JS code here
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

import CartContext from '../../context/CartContext'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const onClickLogOutButton = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      console.log(cartList.length)

      const showCartCount = () =>
        cartList.length > 0 ? (
          <span className="cart_count">{cartList.length}</span>
        ) : null

      return (
        <>
          <nav className="nav_bg_container">
            <div className="nav_bar_card_container_inside_bg_container">
              <Link to="/" className="link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                  className="nav_img_element"
                />
              </Link>
              <ul className="nav_items_container">
                <Link to="/" className="link">
                  <li className="nav_item">Home</li>
                </Link>
                <Link to="/products" className="link">
                  <li className="nav_item">Products</li>
                </Link>
                <Link to="/cart" className="link">
                  <li className="nav_item cart_quantity_icon_container">
                    Cart
                    {showCartCount()}
                  </li>
                </Link>
                <li>
                  <button
                    className="logout_button_element"
                    type="button"
                    onClick={onClickLogOutButton}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <div className="log_out_img_container_sm">
                <button
                  type="button"
                  className="log_out_button_element_sm"
                  onClick={onClickLogOutButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav_logout_img_element"
                  />
                </button>
              </div>
            </div>
          </nav>
          <ul className="nav_items_sm">
            <li>
              <Link to="/" className="link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                  alt="nav home"
                  className="nav_item_sm"
                />
              </Link>
            </li>
            <li>
              <Link to="/products" className="link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                  alt="nav products"
                  className="nav_item_sm"
                />
              </Link>
            </li>
            <li>
              <Link className="link cart_quantity_icon_container" to="/cart">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                  alt="nav cart"
                  className="nav_item_sm"
                />
                {showCartCount()}
              </Link>
            </li>
          </ul>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default withRouter(Header)
