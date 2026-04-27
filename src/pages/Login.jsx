import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, LogIn } from 'lucide-react'
import './login.css'

function Login({ setToken, onLogin }) {
  const navigate = useNavigate()
  // We use this to toggle between the login and sign up forms
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Check if passwords match only if we are registering
    if (isRegister && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Decide which API endpoint to hit
    const url = isRegister
      ? '/api/auth/register'
      : '/api/auth/login'

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      // If login is successful, save the token and go to the home page
      if (!isRegister) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        setToken(data.token)
        if (onLogin) onLogin(data.token)
        navigate('/')
      } else {
        // If registration is successful, switch back to login mode
        setError('Registered! You can now login.')
        setIsRegister(false)
      }
    } catch (err) {
      setError('Could not connect to server')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">
            {isRegister ? 'Join Tasky' : 'Welcome to Tasky'}
          </h2>
          <p className="login-subtitle">Organize your student life simply.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="login-input"
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
              />
            </div>
          </div>
          {isRegister && (
            <div className="input-group">
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="login-input"
                />
              </div>
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            <LogIn size={20} />
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <p className="login-footer">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsRegister(!isRegister)} className="toggle-button">
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
