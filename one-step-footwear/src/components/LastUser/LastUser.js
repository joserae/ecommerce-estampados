import React from "react";
import './LastUser.css'
import { useState, useEffect } from 'react';


function LastUser() {


  const [lastUser, setLastUser] = useState([]);
  
  useEffect(function(){
    console.log('%cse montó el componente LastUser en LastUser', 'color: green');
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => {


      let usersArray = data.users
      let mostRecentDateU = new Date(Math.max.apply(null, usersArray.map( element => {
        return new Date(element.created_date);
      })));


      let mostRecentUser = usersArray.filter( element => {
        let d = new Date( element.created_date );
        return d.getTime() === mostRecentDateU.getTime();
     })[0];

      
      setLastUser(mostRecentUser)


    })
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    console.log('%cse actualizó el componente LastUser en LastUser', 'color: yellow');
  }, [lastUser])

  useEffect(() => {
    return() => console.log('%cse desmontó el componente LastUser en LastUser', 'color: red')
  },[])
     

	return(
        <>
            <div className="last_user">
                { LastUser === '' && <p>Cargando...</p> }
                <p>Ultimo usuario registrado: {lastUser.first_name} {lastUser.last_name}.</p>
            </div>
		         {/* <div className="last_product_container">
                <img className="last-product-img" src={`http://localhost:3000/img/${mostRecentProduct.img}`} />
                <div className="last-product-text-container">
                    <h1>Ultimo producto:</h1>
                    { mostRecentProduct == '' && <p>Cargando...</p> }
                    <h2>{mostRecentProduct.name}</h2>
                </div>
            </div>  */}
        </>
	);
}

export default LastUser;