import React from 'react'
import '../CSS/item.css'

const Item = ({ thumbnail, category, name, price, addItem, inCart, quantity, handleMinus }) => {
  return (
    <div className='shop-item'>
      <div className='item-thumbnail'>
        <img src={thumbnail} alt={name} />

        {!inCart ? (
          <button onClick={addItem}>
            <img src="/images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className='quantity-btn'>
            <div className='minus' onClick={handleMinus}>-</div>
            <div className='quantityValue'>{quantity}</div>
            <div className='plus' onClick={addItem}>+</div>
          </div>
        )}
      </div>
      <div className='item-info'>
        <p className='item-category'>{category}</p>
        <p className='item-name'>{name}</p>
        <p className='item-price'>{price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Item;
