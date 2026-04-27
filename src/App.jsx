import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import Login from './pages/Login'
import './App.css'

function App() {
  // We use state to keep track of tasks and the login token
  const [tasks, setTasks] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Every time the token changes, we fetch the latest tasks from the server
  useEffect(() => {
    if (token) {
      fetch('/api/tasks', {
        headers: { 'Authorization': token }
      })
        .then(res => {
          if (res.status === 401) {
            logout()
            throw new Error('Unauthorized')
          }
          return res.json()
        })
        .then(data => setTasks(data))
        .catch(err => console.error('Fetch error:', err))
    }
  }, [token])

  // Clear everything when logging out
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setToken(null)
    setTasks([])
  }

  function handleLogin(newToken) {
    setToken(newToken)
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Only show Navbar if logged in */}
        {token && <Navbar logout={logout} />}
        <main className={token ? 'main-content with-sidebar' : 'main-content'}>
          <Routes>
            {/* If not logged in, always show login page. Otherwise, show app pages. */}
            {!token ? (
              <Route path="*" element={<Login setToken={setToken} onLogin={handleLogin} />} />
            ) : (
              <>
                <Route path="/" element={<Home tasks={tasks} />} />
                <Route path="/list" element={<TaskList tasks={tasks} setTasks={setTasks} token={token} />} />
                <Route path="/add" element={<AddTask tasks={tasks} setTasks={setTasks} token={token} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
