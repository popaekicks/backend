import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
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

    // Send the new task to our backend API
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ title })
    })

    const data = await res.json()

    if (res.ok) {
      // If the server says OK, add it to our list and go back
      setTasks([...tasks, data])
      navigate('/list')
    } else {
      setError(data.message)
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
