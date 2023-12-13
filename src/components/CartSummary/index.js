// Write your code here

import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalPrice = 0
      let i = 0
      while (i < cartList.length) {
        totalPrice += cartList[i].price * cartList[i].quantityCount
        i += 1
      }
      const cartItemsCount = cartList.length
      return (
        <div className="cart_summary_bg_container">
          <div className="cart_summary_details_container">
            <h1 className="cart_items_price_element">
              <span className="cart_summary_main_heading">Order Total:</span> Rs{' '}
              {totalPrice}/-
            </h1>

            <p className="total-items">{cartItemsCount} Items in cart</p>
            <button className="checkout_button_element" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
