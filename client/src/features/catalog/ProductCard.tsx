import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";

interface Props {
    prod: Product;
}

function ProductCard({ prod }: Props) {
    const [loading, setLoading] = useState(false)
    const { setBasket } = useStoreContext()

    const handleAdditem = (productId: number) => {
        setLoading(true)
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }


    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {prod.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={prod.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'lightgray' }}
                image={prod.pictureUrl}
            // title={prod.name}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    {currencyFormat(prod.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {prod.brand} / {prod.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={loading}
                    size="small"
                    onClick={() => handleAdditem(Number(prod.id))}
                >
                    Add to cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${prod.id}`} size='small'>
                    View
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
