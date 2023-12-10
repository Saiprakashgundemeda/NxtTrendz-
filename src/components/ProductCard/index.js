import {Link} from 'react-router-dom'
import './index.css'

const ProductsCard = props => {
  const {productDetails} = props
  const {id, title, brand, imageUrl, price, rating} = productDetails
  return (
    <Link to={`/products/${id}`} className="product_link_component_element">
      <li className="product_item_card_container">
        <img alt={title} src={imageUrl} className="product_img_element" />
        <h1 className="title_element">{title}</h1>
        <p className="brand_element">{`by ${brand}`}</p>
        <div className="product_item_bottom_section_container">
          <p className="price_element">{`Rs ${price}/-`}</p>
          <div className="rating_box_container">
            <p className="rating_element">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}
export default ProductsCard
