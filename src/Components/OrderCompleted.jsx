import React from 'react'
import '../CSS/orderCompleted.css'

const OrderCompleted = ({ name, price, quantity, thumbnail }) => {

    const totalPrice = price * quantity

  return (
    <div className='ordered-item'>
      <div className='ordered-left'>
      <div className='ordered-item-thumbnail'>
        <img src={thumbnail} alt='Item image'/>
      </div>
      <div className='ordered-item-info'>
        <h4 className='ordered-item-info-title'>{name}</h4>
        <p><span className='ordered-item-single-amount'>{quantity}x</span><span className='cart-item-single-price'>@ ${price.toFixed(2)}</span></p>
      </div>
      </div>
      <div className='ordered-item-total-wrapper'>
      <span className='cart-item-total-price'>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default OrderCompleted