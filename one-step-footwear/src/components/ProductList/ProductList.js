import React from "react";
import './ProductList.css'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(function(){
        console.log('%cse montó el componente products en ProductList', 'color: green');
        fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            console.log("checking in productList what is brought",data.products)
            setProducts(data.products)
        })
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        console.log('%cse actualizó el componente products en ProductList', 'color: yellow');
    }, [products])

    useEffect(() => {
        return() => console.log('%cse desmontó el componente products en ProductList', 'color: red')
    },[])

    return(
        <>
            <h1>Lista de productos:</h1>
            <div className="product_div">
                { products.length === 0 && <p>Cargando</p> }
                {products.map(function(product, i){
                        return(
                            <div className="product-list">
                                <h2>{product.brand} {product.name}</h2>
                                <NavLink to={`product-details/${product.id}`}><img src={`http://localhost:3000/img/${product.img}`} alt="product"/></NavLink>
                                <p>${product.price}</p>
                            </div>
                        )
                })}
            </div>
        </>
    )
}

export default ProductList;