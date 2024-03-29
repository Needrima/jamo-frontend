import React, { useEffect, useState } from "react";
import {Routes, Route, useNavigate} from 'react-router'
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";

export const AppContext = React.createContext();

function App() {
  const [state, setState] = useState({
    cartItems: [],
    cartSubtotal: 0,
  })

  useEffect(() => {
    const cart_items = JSON.parse(window.localStorage.getItem('Jamo-cart-items'))
    if (cart_items !== null) {
      changeCartItems(cart_items)
      setCartSubtotal(cart_items)
    }
  }, [])

  const {cartItems, cartSubtotal} = state;

  // setCartItems adds a new item to cart. the item data is an object containing item id, quantity, size, colour
  const setCartItems = (data) => {
    setState(state => ({
        ...state,
        cartItems: [...state.cartItems, data]
    }))
  }

  // changeCartItems changes the value of cartItems after 
  //other data like item price, sizes, image names and other data
  // has been added to each cart item
  const changeCartItems = (data) => {
    setState(state => ({
        ...state,
        cartItems: data
    }))
  }

  // sets the prop (quantity, size or colour) of item with id 'id' to value 'value'
  const setItemProp = (id, prop, value) => {
    cartItems.forEach(item => {
      if (item.id === id) {
        switch (prop) {
          case 'quantity':
            value > 0 ? item['quantity'] = value : item['quantity'] = 1;
            item['subtotal'] = item['price'] * item['quantity'];
            setCartSubtotal(cartItems)
            break;
          case 'size':
            item['size'] = value;
            break
          case 'colour':
            item['colour'] = value;
            break
          default:
        }
      }
    })

    changeCartItems(cartItems)
    window.localStorage.setItem('Jamo-cart-items', JSON.stringify(cartItems))
  }

  // adds a new item(item id, quantity, size and colour) to cart items
  const AddToCart = (id, quantity, size, colour) => {
    const cart_items = JSON.parse(window.localStorage.getItem('Jamo-cart-items'))

    if (!cart_items || cart_items?.length === 0) { // Jamo-cart-items has not been set in local storage or has been set with no data
      window.localStorage.setItem('Jamo-cart-items', JSON.stringify([{id, quantity, size, colour}]))
      setCartItems({id, quantity, size, colour})
    }else {
      let exist = false;
      cart_items.forEach(item => {
        if (item.id === id) {
          alert('item already in cart')
          exist = true
          return
        }
      })

      if (!exist) {
        cart_items.push({id, quantity, size})
        window.localStorage.setItem('Jamo-cart-items', JSON.stringify(cart_items))
        setCartItems({id, quantity, size, colour})
      }      
    }
  }

  const navigate = useNavigate();

  // RemoveFromCart removes item with id 'id' from cart
  const RemoveFromCart = (id) => {
    const remainingItems = cartItems.filter( item => item.id !== id)
    window.localStorage.setItem('Jamo-cart-items', JSON.stringify(remainingItems))
    changeCartItems(remainingItems)
    setCartSubtotal(remainingItems)
    navigate('/cart')
  }

  const setCartSubtotal = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal += item['price'] * item['quantity']
    })

    setState(state => ({
      ...state,
      cartSubtotal: subtotal
    }))
  }

  return (
    <AppContext.Provider value={{
      cartItems,
      AddToCart,
      RemoveFromCart,
      changeCartItems,
      setItemProp,
      cartSubtotal,
      setCartSubtotal,
    }}>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/shop' exact element={<Shop />} />
        <Route path='/single/:id' exact element={<SingleProduct />} />
        {/* <Route path='/blog' exact element={<Blog />} /> */}
        <Route path='/about' exact element={<About />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/cart' exact element={<Cart />} />
        <Route path='/checkout' exact element={<Checkout />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
