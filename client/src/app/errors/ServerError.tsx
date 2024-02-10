import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {

    // useLocation hook from the navigate method w/c has an option state
    // in this case, the state is passed onto the 'error' key w/c has the data
    // as the value in the error
    const { state } = useLocation();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h3" color='secondary'>
                        {state.error.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1">
                        {state.error.detail || 'Internal Server Error'}
                    </Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>
                    Server Error
                </Typography>
            )}

        </Container>
    )
}
