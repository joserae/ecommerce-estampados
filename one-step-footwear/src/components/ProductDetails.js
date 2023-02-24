import React from "react";

function ProductDetails(props) {
    const products = [{
        brand: "Adidas",
        name: "Dragon",
        price: 100000,
    },
    {
        brand: "Nike",
        name: "Mercurial",
        price: 200000
    }
    ]

    return(
            <div>
                    
                <h1>{props.brand} {props.name}</h1>
                <p>${props.price}</p>
            </div>
    )
}

export default ProductDetails;