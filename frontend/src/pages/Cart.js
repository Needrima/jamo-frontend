import React, {useContext, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import CartLayout from '../components/CartComponents/CartLayout'
import axiosInstance from '../axios/axios'
import { AppContext } from '../App'
import { useNavigate } from 'react-router'

const Cart = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Jamo | Cart"
  })

  const {cartItems, changeCartItems, setCartSubtotal} = useContext(AppContext);

  // if (cartItems === null || cartItems.length === 0) {
  //   console.log('no cart item');
  //   // window.location.href = '/shop'
  //   navigate('/shop')
  // }

  useEffect(() => {
    if (!cartItems  || cartItems?.length === 0) {
      console.log('no cart item');
      // window.location.href = '/shop'
      navigate('/shop')
      return
    }

    (async () => {
      if (cartItems !== null && cartItems.length !== 0) {
        const ids = []
        cartItems.forEach(item => ids.push(item.id))

        const res = await axiosInstance.post('cart-items', ids)
        const data = res.data
        cartItems.forEach((item, index) => {
          item['img_names'] = data[index]['img_names']
          item['name'] = data[index]['name']
          item['price'] = data[index]['price']
          item['colours'] = data[index]['colours']
          item['sizes'] = data[index]['sizes']
          item['subtotal'] = item['price'] * item['quantity']
        })

        changeCartItems(cartItems);
        setCartSubtotal(cartItems);
      }
    })()
  }, [])
  
  return (
    <Layout>
        <CartLayout />
    </Layout>
  )
}

export default Cart