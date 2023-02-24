import React from "react";
import './LastProductAndUser.css'
import { useState, useEffect } from 'react';


function LastProductAndUser() {


    // Data for Users
  const [lastUser, setLastUser] = useState([]);

  // Data for Posts
  const [lastProduct, setLastProduct] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/api/users'),
      fetch('http://localhost:3000/api/products'),
    ])
      .then(([resLastUser, resLastProduct]) => 
        Promise.all([resLastUser.json(), resLastProduct.json()])
      )
      .then(([dataUser, dataProduct]) => {
        console.log("probando", dataUser.users)
        setLastUser(dataUser.users);
        setLastProduct(dataProduct.products);
        console.log("probando", dataProduct.products)
      })
      .catch(error => console.log(error));
  }, []);




    let mostRecentDateU = new Date(Math.max.apply(null, lastUser.map( element => {
        return new Date(element.created_date);
     })));
    let mostRecentUser = lastUser.filter( element => {
        let d = new Date( element.created_date );
        return d.getTime() === mostRecentDateU.getTime();
     })[0];



    let mostRecentDate = new Date(Math.max.apply(null, lastProduct.map( element => {
        return new Date(element.created_date);
     })));
    let mostRecentProduct = lastProduct.filter( element => {
        let d = new Date( element.created_date );
        return d.getTime() === mostRecentDate.getTime();
     })[0];

     console.log("Retornando producto mas reciente",mostRecentProduct)


    // useEffect(() => {
    //     console.log('%cse actualizó el componente LastUser en LastProductAndUser', 'color: yellow');
    // }, [lastUser])

    // useEffect(() => {
    //     return() => console.log('%cse desmontó el componente LastUser en LastProductAndUser', 'color: red')
    // },[])

    // let mostRecentDateU = new Date(Math.max.apply(null, lastUser.map( element => {
    //     return new Date(element.created_date);
    //  })));
    // let mostRecentUser = lastUser.filter( element => {
    //     let d = new Date( element.created_date );
    //     return d.getTime() === mostRecentDateU.getTime();
    //  })[0];



    // useEffect(() => {
    //     console.log('%cse actualizó el componente products en LastProduct', 'color: yellow');
    // }, [lastProduct])

    // useEffect(() => {
    //     return() => console.log('%cse desmontó el componente products en LastProduct', 'color: red')
    // },[])

    // let mostRecentDate = new Date(Math.max.apply(null, lastProduct.map( element => {
    //     return new Date(element.created_date);
    //  })));
    // let mostRecentObject = lastProduct.filter( element => {
    //     let d = new Date( element.created_date );
    //     return d.getTime() === mostRecentDate.getTime();
    //  })[0];
     

	return(
        <>
            <div className="last_user">
                { mostRecentUser == '' && <p>Cargando...</p> }
                <p>Ultimo usuario registrado: {mostRecentUser.first_name} {mostRecentUser.last_name}.</p>
            </div>
		    <div className="last_product_container">
                <img className="last-product-img" src={`http://localhost:3000/img/${mostRecentProduct.img}`} />
                <div className="last-product-text-container">
                    <h1>Ultimo producto:</h1>
                    { mostRecentProduct == '' && <p>Cargando...</p> }
                    <h2>{mostRecentProduct.name}</h2>
                </div>
            </div>
        </>
	);
}

export default LastProductAndUser;