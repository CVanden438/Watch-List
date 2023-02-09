import './App.css'
import Landing from './pages/Landing'
import ProtectedRoute from './pages/ProtectedRoute'
import Reviews from './pages/Reviews.js'
import Error from './pages/Error'
import Tasks from './pages/Tasks.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='tasks' element={<Tasks />} />
        </Route>
        <Route path='/login' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
