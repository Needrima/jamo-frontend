import React, { useState } from 'react'
import { useContext } from 'react'
import { CheckoutContext } from '../../pages/Checkout'
import './style.scss'

const CheckoutLayout = () => {
    const {placeOrder} = useContext(CheckoutContext);

    const [delInfo, setDelInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        message: '',
      })
    
      const {name, phone, address, email, message} =  delInfo;
    
      const handleFormChange = (e) => {
        setDelInfo(state => ({
          ...state,
          [e.target.name]: e.target.value,
        }))
      }
    
      const [btnDisabled, setBtnDisabled] = useState(false);
    
      const proceedToPayment = () => {
        console.log('clicked')
        setBtnDisabled(true);
        // place order
        placeOrder(delInfo)

        setBtnDisabled(false);
    
        setDelInfo({
          name: '',
          phone: '',
          email: '',
          address: '',
          message: '',
        })
      }
    
    return (
        <section id="form-details" className='section-p1'>
            <div className='form'>
                <span>Delivery Information</span>
                <input type="text" name="name" value={name} placeholder="Recipient's Name" onChange={handleFormChange} required />
                <input type="text" name="phone" value={phone} placeholder="Recipient's Phone Number" onChange={handleFormChange} required />
                <input type="email" name="email" value={email} placeholder="Recipient's Email Address" onChange={handleFormChange} required />
                <input type="text" name="address" value={address} placeholder="Recipient's Address" onChange={handleFormChange} required />
                <textarea name="message" value={message} cols="30" rows="10" placeholder="Optional Comment" onChange={handleFormChange}></textarea>
                <button onClick={proceedToPayment} disabled={btnDisabled}>Proceed To Payment</button>
            </div>
        </section>
      )
}

export default CheckoutLayout