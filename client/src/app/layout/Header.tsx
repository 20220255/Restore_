import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    changeTheme: () => void;
}

export default function Header({changeTheme}: Props) {

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">
                    RE-STORE
                </Typography>
                <Switch onChange={changeTheme} />
            </Toolbar>
        </AppBar>
    )
}

