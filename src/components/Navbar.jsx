import { Link } from 'react-router-dom'
import { Home, List, PlusCircle, LogOut } from 'lucide-react'
import './Navbar.css'

function Navbar({ logout }) {
  const username = localStorage.getItem('username')

  return (
    <nav className="navbar">
      <div className="nav-header">
        <h2 className="brand">Tasky</h2>
        {username && <p className="user-info">Hi, {username}!</p>}
      </div>
      {/* Links to different pages in our app */}
      <ul className="nav-links">
        <li>
          <Link to="/">
            <Home size={20} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/list">
            <List size={20} />
            <span>My Tasks</span>
          </Link>
        </li>
        <li>
          <Link to="/add">
            <PlusCircle size={20} />
            <span>Add Task</span>
          </Link>
        </li>
      </ul>
      <button onClick={logout} className="logout-btn">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  )
}

export default Navbar
