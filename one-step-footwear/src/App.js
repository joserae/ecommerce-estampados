import Header from './components/Header/Header'
import Home from './pages/Home'
import ProductList from './components/ProductList/ProductList'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Error404 from './pages/Error404'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
  
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="product-list" element={<ProductList/>} />
        <Route path="product-details/:id" element={<ProductDetails/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;