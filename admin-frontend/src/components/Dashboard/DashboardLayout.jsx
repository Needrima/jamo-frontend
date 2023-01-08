import React from 'react'
import './dashboard.scss'

const DashboardLayout = () => {
  return (
    <>
        <h3 className='i-name'>
          Dashboard
        </h3>

        <div className='values'>
          <div className='val-box'>
            <i className='fas fa-shopping-cart'></i>
            <div>
              <h3>200,520</h3>
              <span>Total Orders</span>
            </div>
          </div>

          <div className='val-box'>
            <i className='fas fa-shopping-cart'></i>
            <div>
              <h3>200,510</h3>
              <span>Completed Orders</span>
            </div>
          </div>

          <div className='val-box'>
            <i className='fas fa-shopping-cart'></i>
            <div>
              <h3>10</h3>
              <span>Pending Orders</span>
            </div>
          </div>

          <div className='val-box'>
            <i className='fas fa-dollar-sign'></i>
            <div>
              <h3>NGN 12,000,000</h3>
              <span>Total revenue</span>
            </div>
          </div>

          <div className='val-box'>
            <i className='fas fa-dollar-sign'></i>
            <div>
              <h3>NGN 500,000</h3>
              <span>This Month</span>
            </div>
          </div>
        </div>

        <div className="board">
          
        </div>
    </>
  )
}

export default DashboardLayout