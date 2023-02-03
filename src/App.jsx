import React from 'react'
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import TopBar from './components/TopBar'
import dark from './themes/dark';
import routes from './routes'

export default function App() {
  const page = useRoutes(routes)
  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <TopBar />
      {page}
    </ThemeProvider>
  )
}
