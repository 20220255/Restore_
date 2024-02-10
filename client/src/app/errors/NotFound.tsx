import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
// import astraunut from '../../../public/images/errors/Astronaut-big.png'
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 500, textAlign: "center" }} >
            <Box
                component="img"
                sx={{ height: 300, width: 300 }}
                alt="Astraunut"
                src="../../../public/images/errors/Astronaut-big.png"
            />
            <Typography gutterBottom variant="h3">
                This Page is Lost in Space
            </Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog'>
                Go back to shop
            </Button>
        </Container>
    )
}
