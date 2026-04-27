import { CheckCircle, Clock, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home({ tasks }) {
  // Simple logic to count completed and pending tasks for the dashboard
  const completedCount = tasks.filter(t => t.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <div className="home-page">
      <header className="home-header">
   
      </header>

      {/* Grid showing the quick stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <List size={40} color="#ad1457" className="stat-icon" />
          <h3 className="stat-title">Total Tasks</h3>
          <p className="stat-count total">{tasks.length}</p>
        </div>

        <div className="stat-card">
          <CheckCircle size={40} color="#4caf50" className="stat-icon" />
          <h3 className="stat-title">Completed</h3>
          <p className="stat-count completed">{completedCount}</p>
        </div>

        <div className="stat-card">
          <Clock size={40} color="#ff9800" className="stat-icon" />
          <h3 className="stat-title">Pending</h3>
          <p className="stat-count pending">{pendingCount}</p>
        </div>
      </div>

      <div className="home-actions">
        <Link to="/list" className="btn-primary">
          View All Tasks
        </Link>
        <Link to="/add" className="btn-secondary">
          Add New Task
        </Link>
      </div>
    </div>
  )
}

export default Home
