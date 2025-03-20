import { use, useEffect, useState } from 'react'
import data from '../data.json'
import Item from './Components/Item'
import CartItem from './Components/CartItem'
import OrderCompleted from './Components/orderCompleted'
import { v4 as uuidv4 } from 'uuid'
import './CSS/app.css'

function App() {

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [ordered, setOrdered] = useState(false);
  const [mobileCart, setMobileCart] = useState(false);
  const [bgOverlay, setBgOverlay] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems])

  const addItem = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleMinus = (item) => {
    setCartItems((prevCart) =>
      prevCart
        .map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter(cartItem => cartItem.quantity > 0) // Remove item when quantity reaches 0
    );
  };

  const handleDel = (itemName) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.name !== itemName));
  }

  const handleOrder = () => {
    if(cartItems.length < 1) {
      return;
    } else {
      setOrdered(true)
      setBgOverlay(true);
      setMobileCart(false);
    }
  }

  const startNewOrder = () => {
    setCartItems([]);
    setOrdered(false);
    setBgOverlay(false);
  }

  const cartMenu = () => {
    setMobileCart(true);
    setBgOverlay(true);
  }

  const closeMenu = () => {
    setBgOverlay(false);
    setMobileCart(false);
    setOrdered(false)
  }

  return (
    <>
      <section>
        <div className={`overlay ${bgOverlay ? 'show' : ''}`} onClick={closeMenu}></div>
        <div className='left'>
          <h1 className='title'>Desserts</h1>
          <div className='items'>
            {data.map((item) => (
              <Item
                thumbnail={item.image.desktop}
                category={item.category}
                name={item.name}
                price={item.price}
                inCart={cartItems.some(cartItem => cartItem.name === item.name)}
                quantity={cartItems.find(cartItem => cartItem.name === item.name)?.quantity || 1}
                handleMinus={() => handleMinus(item)}
                addItem={() => addItem(item)}
                key={uuidv4()}
              />
            ))}
          </div>
        </div>
        <div className='right'>
          <button className='cart-mobile' onClick={cartMenu}>Cart</button>
          <div className={`cart ${mobileCart ? 'cart-active' : ''}`}>
            <h2 className='title-cart'>Your Cart</h2>
            <div className='cart-items'>
              {cartItems.length >= 1 ? (
                cartItems.map((item) => (
                  <CartItem name={item.name} price={item.price} quantity={item.quantity} key={uuidv4()} handleDel={handleDel}/>
                ))
              ) : (
                `Add items to your cart to get started!`
              )}
            </div>
            <div className='cart-total-wrapper'>
              <p className='order-text'>Order Total</p>
              <p className='totalPrice'>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
            <div className="carbon">
              <img src="/images/icon-carbon-neutral.svg" alt="Graphic of a tree design" />
              <p>This is a <b>carbon-neutral</b> delivery</p>
            </div>
            <div className='confirm-order-wrapper'>
              <button className='confirm-order' onClick={handleOrder}>Confirm Order</button>
            </div>
          </div>
        </div>
        <div className={`confirmed-wrapper ${ordered ? 'show' : ''}`}>
        <img src="/images/icon-order-confirmed.svg" alt="" />
        <div className='confirmed-text'>
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>
                {cartItems.map((item) => (
                  <OrderCompleted name={item.name} price={item.price} quantity={item.quantity} thumbnail={item.image.desktop} key={uuidv4()}/>
                ))}
        <div className='confirmed-order-total'>
          <p>Order Total</p>
          <h2>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
        </div>
        <button className='startNewOrder' onClick={startNewOrder}>Start New Order</button>
    </div>
      </section>
    </>
  );
}

export default App;
