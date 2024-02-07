import Catalog from "../../features/catalog/Catalog"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useState } from "react";

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
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
