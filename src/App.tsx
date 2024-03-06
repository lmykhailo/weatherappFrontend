import AppRouter from './routes/AppRouter/AppRouter'
import HomeMainPage from './pages/HomeMainPage/HomeMainPage'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <AppRouter></AppRouter>
    </BrowserRouter>
  )
}

export default App
