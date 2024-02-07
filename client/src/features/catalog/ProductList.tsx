import { Grid } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard";

interface Props {
    prod: Product[];
}

function ProductList({ prod }: Props) {
    return (
        <div>
            <Grid container spacing={4}>
                {prod.map((product) => (
                    <Grid item xs={4} key={product.id} >
                        <ProductCard prod={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default ProductList
