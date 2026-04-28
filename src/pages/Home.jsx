import { CheckCircle, Clock, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
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
        <StatCard 
          icon={List} 
          title="Total Tasks" 
          count={tasks.length} 
          colorClass="total" 
        />
        <StatCard 
          icon={CheckCircle} 
          title="Completed" 
          count={completedCount} 
          colorClass="completed" 
        />
        <StatCard 
          icon={Clock} 
          title="Pending" 
          count={pendingCount} 
          colorClass="pending" 
        />
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
