import {BiSearch} from 'react-icons/bi'

import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingOption,
    changeSearchInput,
    categoryChangeBasedOnCategory,
    showProductsBasedOnRating,
    onClickClearFilter,
  } = props

  const onChangeSearchInput = event => {
    console.log('event_key', event.key)

    if (event.key === 'Enter') {
      changeSearchInput(event)
    }
  }

  const displaySearchBar = () => (
    <div className="search_bar_container">
      <input
        type="search"
        className="search_product_input_element"
        placeholder="Search"
        onKeyDown={onChangeSearchInput}
      />
      <BiSearch className="search_icon" />
    </div>
  )

  const onClickCategory = event => {
    const category = categoryOptions.filter(
      eachCategory => eachCategory.name === event.target.textContent,
    )
    console.log('Updated_Category', category)
    categoryChangeBasedOnCategory(category[0].categoryId)
  }

  const displayCategorySection = () => (
    <div>
      <h1 className="category_heading_element">Category</h1>
      <ul className="category_item_list_bg_container">
        {categoryOptions.map(eachCategory => (
          <li key={eachCategory.categoryId}>
            <p className="category_element" onClick={onClickCategory}>
              {eachCategory.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )

  const displayRatingItems = () =>
    ratingOption.map(eachRating => {
      const onClickRating = () => showProductsBasedOnRating(eachRating.ratingId)
      return (
        <li
          className="rating_list_item"
          onClick={onClickRating}
          key={eachRating.ratingId}
        >
          <img
            src={eachRating.imageUrl}
            alt={`rating ${eachRating.ratingId}`}
            className="rating_image_element"
          />{' '}
          <span className="up_span_element">& up</span>
        </li>
      )
    })

  const displayRatingSection = () => (
    <div className="rating_section_bg_container">
      <h1 className="rating_section_heading">Rating</h1>
      <ul className="rating_items_list_container">{displayRatingItems()}</ul>
    </div>
  )

  const displayClearFiltersButton = () => (
    <button
      type="button"
      className="clear_filters_button_element"
      onClick={onClickClearFilter}
    >
      Clear Filters
    </button>
  )

  return (
    <div className="filters_bg_container">
      {displaySearchBar()}
      {displayCategorySection()}
      {displayRatingSection()}
      {displayClearFiltersButton()}
    </div>
  )
}

export default FiltersGroup
