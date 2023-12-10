import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartItemQuantityList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        const newCartItemAfterQuantityIncreased = {
          ...eachCartItem,
          quantityCount: eachCartItem.quantityCount + 1,
        }
        return newCartItemAfterQuantityIncreased
      }
      return eachCartItem
    })
    this.setState({cartList: updatedCartItemQuantityList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartItemQuantityList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        const newCartItemAfterQuantityDecreased = {
          ...eachCartItem,
          quantityCount: eachCartItem.quantityCount - 1,
        }
        return newCartItemAfterQuantityDecreased
      }
      return eachCartItem
    })

    const nonEmptyQuantityList = updatedCartItemQuantityList.filter(
      eachCartItem => eachCartItem.quantityCount > 0,
    )
    this.setState({cartList: nonEmptyQuantityList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartListAfterRemovingCartItem = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: newCartListAfterRemovingCartItem})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const isProductPresent = cartList.find(item => item.id === product.id)

    // console.log(product)

    //  console.log('isProductPresent:', isProductPresent)
    console.log('cartList:', cartList)
    if (isProductPresent === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedExistingCartItemQuantity = cartList.map(eachProduct => {
        if (eachProduct.id === product.id) {
          const eachItem = {
            ...eachProduct,
            quantityCount: eachProduct.quantityCount + product.quantityCount,
          }
          return eachItem
        }
        return eachProduct
      })
      console.log('updatedCart:', updatedExistingCartItemQuantity)
      this.setState({cartList: updatedExistingCartItemQuantity})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
