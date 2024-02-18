import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Add, Delete, Remove } from "@mui/icons-material"
import { useStoreContext } from "../../app/context/StoreContext"
import { useState } from "react"
import agent from "../../app/api/agent"
import { LoadingButton } from "@mui/lab"
import BasketSummary from "./BasketSummary"
import { Link } from "react-router-dom"


export default function BasketPage() {

    const { basket, removeItem, setBasket } = useStoreContext()
    const [status, setStatus] = useState({
        name: '',
        loading: false
    })

    const handleAddItem = (productId: number, name: string) => {
        setStatus({ loading: true, name })
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
        setStatus({ loading: true, name })
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    if (!basket) {
        return <Typography variant="h3">Your basket is empty</Typography>
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="item">
                                    <Box display="flex" alignItems="center">
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton 
                                        color="error" 
                                        loading={status.loading && status.name === 'removeLoading' + item.productId} 
                                        onClick={() => handleRemoveItem(item.productId, 1, 'removeLoading' + item.productId)}>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton 
                                        color="secondary" 
                                        loading={status.loading && status.name === 'addLoading' + item.productId} 
                                        onClick={() => handleAddItem(item.productId, 'addLoading' + item.productId)}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${((item.quantity * item.price) / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                        loading={status.loading && status.name === 'deleteLoading' + item.productId} 
                                        color="error" 
                                        onClick={() => handleRemoveItem(item.productId, item.quantity, 'deleteLoading' + item.productId)}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}
