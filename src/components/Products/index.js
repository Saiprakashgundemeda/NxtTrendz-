// Write your JS code here

import {Component} from 'react'

import Header from '../Header/index'

import AllProductsSection from '../AllProductsSection/index'

import PrimeDealsSection from '../PrimeDealsSection/index'

import './index.css'

class Products extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="products_tab_bg_container">
          <div className="products_container">
            <PrimeDealsSection />
            <AllProductsSection />
          </div>
        </div>
      </>
    )
  }
}

export default Products
