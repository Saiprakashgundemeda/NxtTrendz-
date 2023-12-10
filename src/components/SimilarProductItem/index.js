// Write your code here
// import {Link} from 'react-router-dom'

import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  // const {id} = productDetails
  const {imageUrl, title, price, brand, rating} = productDetails
  return (
    <li className="similar_product_item_card_container">
      <img
        alt={`similar product ${title}`}
        src={imageUrl}
        className="similar_product_img_element"
      />
      <h1 className="similar_product_title_element">{title}</h1>
      <p className="similar_product_brand_element">{`by ${brand}`}</p>
      <div className="similar_product_item_bottom_section_container">
        <p className="similar_product_item_price_element">{`Rs ${price}/-`}</p>
        <div className="similar_product_item_rating_box_container">
          <p className="similar_product_item_rating_element">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar_product_item_star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
