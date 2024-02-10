import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

function Catalog() {

    const [prod, setProd] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProd(products))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <LoadingComponent message="Catalog is loading..."/>
    }
  
    return (
        <>
            <ProductList prod={prod} />
        </>
    )
}

export default Catalog
