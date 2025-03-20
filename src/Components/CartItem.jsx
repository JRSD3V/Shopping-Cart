import React from 'react'
import '../CSS/cartItem.css'

const CartItem = ({ name, price, quantity, handleDel }) => {

  const totalPrice = price * quantity

  return (
    <div className='cart-item'>
      <div className='cart-item-info'>
        <h4 className='cart-item-info-title'>{name}</h4>
        <p><span className='cart-item-single-amount'>{quantity}x</span><span className='cart-item-single-price'>@ ${price.toFixed(2)}</span><span className='cart-item-total-price'>${totalPrice.toFixed(2)}</span></p>
      </div>
      <div className='cart-item-x' onClick={() => handleDel(name)}>
        <span>x</span>
      </div>
    </div>
  )
}

export default CartItem