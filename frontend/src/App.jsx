import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/HomePage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'
import JobPage from './pages/JobPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add-job' element={<AddJobPage />} />
            <Route path='/edit-job/:id' element={<EditJobPage />} />
            <Route path='/jobs/:id' element={<JobPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
