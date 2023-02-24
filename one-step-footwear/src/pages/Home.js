import React from 'react';
import Totals from '../components/Totals/Totals'
import LastProductAndUser from '../components/LastProductAndUser/LastProductAndUser';
import ProductList from '../components/ProductList/ProductList';


function Home(){
  return (
    <>
        <LastProductAndUser/>
        <Totals/>
        <ProductList/>
    </>
  )
}

export default Home;