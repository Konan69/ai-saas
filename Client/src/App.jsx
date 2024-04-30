import { useMemo, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import {CssBaseline, ThemeProvider} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import Navbar from "./Components/navbar"
import HomePage from './Pages/homePage'
// import LoginPage from './Pages/loginPage'
import RegisterPage from './Pages/registerPage'

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), [])

  return (
    <>
    <div className='App'>
      <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <Navbar/>
      <Routes>
      <Route exact path="/" element = {<HomePage/>} />
      {/* <Route exact path="/login" element={<LoginPage />} />  */}
      <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
      </ThemeProvider>
    </div>
    </>
  )
}

export default App
