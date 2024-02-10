import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header changeTheme={changeTheme} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
