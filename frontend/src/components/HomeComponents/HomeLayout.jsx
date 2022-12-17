import React, {useState, useEffect} from 'react'
import Adverts from '../Adverts/Adverts'
import Footer from '../Footer/Footer'
import Newsletter from '../NewsLetter/Newsletter'
import Products from '../Product/Products'
import Hero from './Hero'
import './home.scss'
import {productAxiosInstance} from '../../axios/axios'

const HomeLayout = () => {
  const [state, setState] = useState({
    products: []
  });

  const {products} = state;

  useEffect(() => {
    getProducts('4')
  }, [])

  const getProducts = (number) => {
    productAxiosInstance.get(`/${number}`)
    .then((res)=> res.status === 200 ? setState(state => ({...state, products: res.data})) : [])
    .catch((error)=> console.log(error))
  }

  return (
    <>
      <Hero />
      <Products products={products} h2="Check these out" />
      <Adverts />
      <Newsletter />
      <Footer />
    </>
  )
}

export default HomeLayout