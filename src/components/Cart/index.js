import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary/index'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      let totalPrice = 0
      let i = 0
      while (i < cartList.length) {
        totalPrice += cartList[i].price * cartList[i].quantityCount
        i += 1
      }
      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove_all_button"
                  type="button"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>
                <CartListView />
                <CartSummary
                  cartItemsCount={cartList.length}
                  totalPrice={totalPrice}
                />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
