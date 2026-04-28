import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import { taskService } from '../services/api'
import './AddTask.css'

function AddTask({ tasks, setTasks, token }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title) {
      setError('Title is required')
      return
    }

    try {
      // Send the new task to our backend API
      const data = await taskService.create(token, title)
      
      // If the server says OK, add it to our list and go back
      setTasks([...tasks, data])
      navigate('/list')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="add-task-page">
      <h2 className="add-task-title">
        <PlusCircle /> Add New Task
      </h2>
      <div className="add-task-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">What needs to be done?</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="form-input"
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTask
