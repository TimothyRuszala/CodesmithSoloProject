/* jshint ignore:start */


import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import EmojiCardCheckout from './EmojiCardCheckout.jsx';



const Cart = props => {

  const [fetched, setFetched] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/cart/myCart')
    .then(data => data.json())
    .then(cart => {
      console.log('Got data from /myCart:', cart);
      if (!fetched) {
        setFetched(true);
        setCartItems(cart.items);
      }
    })
  })

  const removeCartItem = function (name) {
        console.log('Cart.jsx removeCartItem called');
        fetch(`/cart/${name}`, {
            method: 'DELETE',
        })
            .then(data => data.json())
            .then(data => {
              // console.log('data returned after delete:', data);
              setCartItems(data.items);
              setFetched(false);
        })
    }
  
  
  if (!fetched) {
    return (
      <>
        <Header />
       <div>
          <h2>Loading...</h2>
        </div>
      </>
    )
  }

  let emojiCheckoutCards = [];
  let total = 0;
  for (let emoji of cartItems) {
    emojiCheckoutCards.push(<EmojiCardCheckout emoticon={emoji.emoticon} name={emoji.name} price={emoji.price} remove={removeCartItem} />)
    total += emoji.price;
  }
  
  return (
      <div>
        <Header />
        <div className="content cart-content">
          <div className="cart-container">
            <h2>Your Cart:</h2>
            <div className="cart-items">
            {emojiCheckoutCards}
          </div>
          <div className="checkout-info">
            <p>Total: ${parseFloat(total).toFixed(2)}</p>
            <form action="/cart/create-checkout-session" method="POST">
              <button type="submit">
                Checkout
              </button>
            </form>
            {/* <p><strong>Go to checkout</strong></p> */}
          </div>
          </div>
        </div>
      </div>
    )
}

export default Cart;