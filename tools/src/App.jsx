import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
