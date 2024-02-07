import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

interface Props {
    prod: Product;
}

function ProductCard({ prod }: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {prod.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={prod.name}
                titleTypographyProps={{
                    sx:{fontWeight: 'bold', color: 'primary.main'}
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'lightgray' }}
                image={prod.pictureUrl}
                  // title={prod.name}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    ${(prod.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {prod.brand} / {prod.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button component={Link} to={`/catalog/${prod.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
