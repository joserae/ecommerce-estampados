import React from 'react';
import Totals from '../components/Totals/Totals'
import LastUser from '../components/LastUser/LastUser';
import LastProduct from '../components/LastProduct/LastProduct';
import ProductList from '../components/ProductList/ProductList';


function Home(){
  return (
    <>
        <LastUser/>
        <LastProduct/>
        <Totals/>
        <ProductList/>
    </>
  )
}

export default Home;