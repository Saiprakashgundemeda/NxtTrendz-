// Write your code here
// Write your code here

import './index.css'

const CartSummary = props => {
  const {cartItemsCount, totalPrice} = props
  return (
    <div className="cart_summary_bg_container">
      <div className="cart_summary_details_container">
        <h1 className="cart_items_price_element">
          <span className="cart_summary_main_heading">Order Total:</span> Rs
          {totalPrice}
          /-
        </h1>
        <p className="total-items">{cartItemsCount} Items in cart</p>
        <button className="checkout_button_element" type="button">
          Checkout
        </button>
      </div>
    </div>
  )
}
export default CartSummary
