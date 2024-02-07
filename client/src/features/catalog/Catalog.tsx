import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

function Catalog() {

    const [prod, setProd] = useState<Product[]>([])

    useEffect(() => {
      fetch('http://localhost:5243/api/Products')
        .then(resp => resp.json())
        .then(data => setProd(data))
    }, [])
  
    return (
        <>
            <ProductList prod={prod} />
        </>
    )
}

export default Catalog
