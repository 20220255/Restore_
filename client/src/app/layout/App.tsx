import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {

  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: !darkMode ? '#eaeaea' : '#121212' 
      }
    }
  });

  const changeTheme = () => {
    setDarkMode(!darkMode)
  }
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header changeTheme={changeTheme} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
